/**
 * @class MaterialService
 */
class MaterialService {
  /**
   * Constructor
   * @param {*} materialRepository 
   */
  constructor(materialRepository) {
    this.materialRepository = materialRepository;
  }

  /**
   * Gets all the materials
   * @returns
   */
  getAllMaterials() {
    return this.materialRepository.getAll();
  }

  /**
   * Gets all the materials belonging to certain construction site
   * @param {*} constructionSiteId 
   * @returns 
   */
  async getMaterials(constructionSiteId) {
    const query = {
      construction_site: constructionSiteId
    };

    const result = await this.materialRepository.get(query);
    const totalCost = this.calculateTotalCost(result);
    
    return {
      total_cost: totalCost,
      data: result
    };
  }

  /**
   * Saves materials
   * @param {*} materials 
   * @returns 
   */
  saveMaterials(materials) {
    return this.materialRepository.save(materials);
  }

  /**
   * Updates materials
   * @param {*} materials 
   * @returns 
   */
  updateMaterials(data) {
    try {
      data.forEach(item => {
        const condition = { id: item.material_id };
        const data = item.material;
    
        this.materialRepository.update(condition, data);
      });

      return true;
    } catch (err) {
      if (err) return false;
    }
  }

  /**
   * Deletes materials
   * @param {*} ids 
   * @returns 
   */
  deleteMaterials(ids) {
    return this.materialRepository.deleteMaterials(ids);
  }

  /**
   * Calculates total cost of the materials for the construction site
   * @param {*} result 
   * @returns 
   */
  calculateTotalCost(result) {
    return result.reduce((totalCost, currItem) => {
      return totalCost + currItem.volume_cubic_meter * currItem.cost_cubic_meter;
    }, 0);
  }
}

export default MaterialService;