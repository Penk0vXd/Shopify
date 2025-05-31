/**
 * VIN Decoder REST API
 * Node.js/Express implementation for Bulgarian automotive e-commerce
 * 
 * Usage:
 * - GET /api/vin/:vin - Decode a specific VIN
 * - POST /api/vin/decode - Decode VIN from request body
 * - GET /api/vin/validate/:vin - Validate VIN format only
 * - GET /api/manufacturers - Get list of supported manufacturers
 */

const express = require('express');
const cors = require('cors');
const VINDecoder = require('./assets/vin-decoder.js');

class VINDecoderAPI {
  constructor() {
    this.app = express();
    this.decoder = new VINDecoder();
    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    // Enable CORS for all routes
    this.app.use(cors());
    
    // Parse JSON request bodies
    this.app.use(express.json());
    
    // Parse URL-encoded request bodies
    this.app.use(express.urlencoded({ extended: true }));
    
    // Request logging
    this.app.use((req, res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
      next();
    });
  }

  setupRoutes() {
    // Health check endpoint
    this.app.get('/api/health', (req, res) => {
      res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'VIN Decoder API',
        version: '1.0.0'
      });
    });

    // Decode VIN via GET
    this.app.get('/api/vin/:vin', (req, res) => {
      this.handleVinDecoding(req, res, req.params.vin);
    });

    // Decode VIN via POST
    this.app.post('/api/vin/decode', (req, res) => {
      const { vin } = req.body;
      
      if (!vin) {
        return res.status(400).json({
          error: 'VIN is required',
          message: 'Please provide a VIN in the request body'
        });
      }
      
      this.handleVinDecoding(req, res, vin);
    });

    // Validate VIN format only
    this.app.get('/api/vin/validate/:vin', (req, res) => {
      try {
        const vin = req.params.vin;
        const validation = this.decoder.validateVIN(vin);
        
        res.json({
          vin: vin,
          isValid: validation.isValid,
          errors: validation.errors || [],
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({
          error: 'Validation failed',
          message: error.message
        });
      }
    });

    // Get supported manufacturers
    this.app.get('/api/manufacturers', (req, res) => {
      try {
        const wmiDatabase = this.decoder.getWMIDatabase();
        const manufacturers = {};
        
        // Group WMI codes by manufacturer
        Object.entries(wmiDatabase).forEach(([code, data]) => {
          if (!manufacturers[data.manufacturer]) {
            manufacturers[data.manufacturer] = {
              name: data.manufacturer,
              country: data.country,
              region: data.region,
              codes: []
            };
          }
          manufacturers[data.manufacturer].codes.push(code);
        });
        
        res.json({
          manufacturers: Object.values(manufacturers),
          total: Object.keys(manufacturers).length,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({
          error: 'Failed to get manufacturers',
          message: error.message
        });
      }
    });

    // Get year codes
    this.app.get('/api/year-codes', (req, res) => {
      try {
        const yearCodes = this.decoder.getYearCodes();
        res.json({
          yearCodes: yearCodes,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({
          error: 'Failed to get year codes',
          message: error.message
        });
      }
    });

    // Batch VIN decoding
    this.app.post('/api/vin/batch', (req, res) => {
      try {
        const { vins } = req.body;
        
        if (!Array.isArray(vins)) {
          return res.status(400).json({
            error: 'Invalid input',
            message: 'vins must be an array of VIN strings'
          });
        }
        
        if (vins.length > 50) {
          return res.status(400).json({
            error: 'Too many VINs',
            message: 'Maximum 50 VINs per batch request'
          });
        }
        
        const results = vins.map(vin => {
          try {
            return this.decoder.decode(vin);
          } catch (error) {
            return {
              vin: vin,
              isValid: false,
              error: error.message
            };
          }
        });
        
        res.json({
          results: results,
          total: results.length,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        res.status(500).json({
          error: 'Batch decoding failed',
          message: error.message
        });
      }
    });

    // Error handling middleware
    this.app.use((error, req, res, next) => {
      console.error('API Error:', error);
      res.status(500).json({
        error: 'Internal server error',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    });

    // 404 handler
    this.app.use((req, res) => {
      res.status(404).json({
        error: 'Not found',
        message: `Route ${req.method} ${req.path} not found`,
        timestamp: new Date().toISOString()
      });
    });
  }

  handleVinDecoding(req, res, vin) {
    try {
      // Input validation
      if (!vin || typeof vin !== 'string') {
        return res.status(400).json({
          error: 'Invalid VIN',
          message: 'VIN must be a non-empty string'
        });
      }

      // Clean the VIN
      const cleanVin = vin.toUpperCase().trim();
      
      // Decode the VIN
      const result = this.decoder.decode(cleanVin);
      
      // Add API metadata
      result.timestamp = new Date().toISOString();
      result.api_version = '1.0.0';
      
      // Add formatted VIN
      if (result.isValid) {
        result.formatted_vin = this.decoder.formatVIN(result.vin);
      }
      
      // Add Bulgarian translations if requested
      if (req.query.lang === 'bg' && result.isValid) {
        result.translations = this.decoder.getBulgarianTranslations();
      }
      
      res.json(result);
    } catch (error) {
      console.error('VIN Decoding Error:', error);
      res.status(500).json({
        error: 'Decoding failed',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }

  start(port = 3000) {
    this.app.listen(port, () => {
      console.log(`🚗 VIN Decoder API running on port ${port}`);
      console.log(`📖 API Documentation:`);
      console.log(`   GET  http://localhost:${port}/api/health`);
      console.log(`   GET  http://localhost:${port}/api/vin/:vin`);
      console.log(`   POST http://localhost:${port}/api/vin/decode`);
      console.log(`   GET  http://localhost:${port}/api/vin/validate/:vin`);
      console.log(`   GET  http://localhost:${port}/api/manufacturers`);
      console.log(`   POST http://localhost:${port}/api/vin/batch`);
    });
  }
}

// Example usage and testing
if (require.main === module) {
  const api = new VINDecoderAPI();
  api.start(process.env.PORT || 3000);
}

module.exports = VINDecoderAPI;

/*
 * Package.json dependencies for this API:
 * 
 * {
 *   "name": "vin-decoder-api",
 *   "version": "1.0.0",
 *   "description": "VIN Decoder REST API for Bulgarian automotive e-commerce",
 *   "main": "vin-decoder-api.js",
 *   "scripts": {
 *     "start": "node vin-decoder-api.js",
 *     "dev": "nodemon vin-decoder-api.js",
 *     "test": "node test-api.js"
 *   },
 *   "dependencies": {
 *     "express": "^4.18.2",
 *     "cors": "^2.8.5"
 *   },
 *   "devDependencies": {
 *     "nodemon": "^3.0.1"
 *   },
 *   "engines": {
 *     "node": ">=14.0.0"
 *   }
 * }
 * 
 * Example API calls:
 * 
 * # Decode a VIN
 * curl http://localhost:3000/api/vin/WBA3A5C56DF586123
 * 
 * # Decode with Bulgarian translations
 * curl "http://localhost:3000/api/vin/WBA3A5C56DF586123?lang=bg"
 * 
 * # Validate VIN format
 * curl http://localhost:3000/api/vin/validate/WBA3A5C56DF586123
 * 
 * # Get supported manufacturers
 * curl http://localhost:3000/api/manufacturers
 * 
 * # Batch decode VINs
 * curl -X POST http://localhost:3000/api/vin/batch \
 *   -H "Content-Type: application/json" \
 *   -d '{"vins": ["WBA3A5C56DF586123", "WDD2050461A123456"]}'
 * 
 * # Health check
 * curl http://localhost:3000/api/health
 */ 