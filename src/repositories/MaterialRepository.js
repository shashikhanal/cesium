import * as Material from '../models/Material.js';

/**
 * @class MaterialRepository
 */
class MaterialRepository {
  /**
   * Constructor
   */
  constructor() {
    this.material = Material;
  }

  /**
   * Gets all the materials
   * @returns 
   */
  async getAll() {
    return this.material.getAll();
  }

  /**
   * Gets all the materials as per the query
   * @param {*} query 
   * @returns 
   */
  async get(query) {
    return this.material.get(query);
  }

  /**
   * Adds materials into the database
   * @param {*} data 
   * @returns 
   */
  async save(data) {
    return this.material.save(data);
  }

  /**
   * Updates material
   * @param {*} condition 
   * @param {*} data 
   * @returns 
   */
  async update(condition, data) {
    return this.material.update(condition, data);
  }

  /**
   * Deletes materials
   * @param {*} ids 
   * @returns 
   */
  async deleteMaterials(ids) {
    return this.material.deleteMaterials(ids);
  }
}

export default MaterialRepository;