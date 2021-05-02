import MaterialRepository from '../repositories/MaterialRepository.js';
import MaterialService from '../services/MaterialService.js';

/**
 * This is used for dependency injection
 */
const materialRepository = new MaterialRepository();
// Inject the repository into the service
const materialService = new MaterialService(materialRepository);

export {
  materialRepository,
  materialService
};