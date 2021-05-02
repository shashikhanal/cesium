import chai from 'chai';
import sinon from 'sinon';
import faker from 'faker';
import MaterialRepository from '../src/repositories/MaterialRepository.js';
import MaterialService from '../src/services/MaterialService.js';

const expect = chai.expect;

/**
 * Unit tests for MaterialService
 */
describe('MaterialService', function() {
  describe('getMaterials', function() {
    it('should fetch materials of the construction site', async function() {
      const stubInput = [{
        id: faker.datatype.number(),
        name: faker.name.findName(),
        construction_site: faker.datatype.uuid(),
        volume_cubic_meter: faker.datatype.number(),
        cost_cubic_meter: faker.datatype.number(),
        color: faker.commerce.color(),
        delivery_date: faker.date.future(),
      }];

      const expectedOutput = {
        total_cost: stubInput.reduce((totalCost, currItem) => {
          return totalCost + currItem.volume_cubic_meter * currItem.cost_cubic_meter;
        }, 0),
        data: stubInput
      };

      const materialRepo = new MaterialRepository();
      // this runs the stub that simulates the database operation
      const stub = sinon.stub(materialRepo, 'get').returns(stubInput);

      const materialService = new MaterialService(materialRepo);
      const material = await materialService.getMaterials(stubInput.construction_site);

      expect(stub.calledOnce).to.be.true;
      expect(material.total_cost).to.be.equal(expectedOutput.total_cost);
      expect(material.data[0].id).to.equal(expectedOutput.data[0].id);
      expect(material.data[0].name).to.equal(expectedOutput.data[0].name);
      expect(material.data[0].construction_site).to.equal(expectedOutput.data[0].construction_site);
      expect(material.data[0].volume_cubic_meter).to.equal(expectedOutput.data[0].volume_cubic_meter);
      expect(material.data[0].cost_cubic_meter).to.equal(expectedOutput.data[0].cost_cubic_meter);
      expect(material.data[0].color).to.equal(expectedOutput.data[0].color);
      expect(material.data[0].delivery_date).to.equal(expectedOutput.data[0].delivery_date);
    });
  });

  describe('saveMaterials', function() {
    it('should create materials for the construction site', async function() {
      const stubInput = [{
        name: faker.name.findName(),
        construction_site: faker.datatype.uuid(),
        volume_cubic_meter: faker.datatype.number(),
        cost_cubic_meter: faker.datatype.number(),
        color: faker.commerce.color(),
        delivery_date: faker.date.future(),
      }];

      const expectedOutput = {
        rowCount: stubInput.length
      };

      const materialRepo = new MaterialRepository();
      // this runs the stub that simulates the database operation
      const stub = sinon.stub(materialRepo, 'save').returns(expectedOutput);

      const materialService = new MaterialService(materialRepo);
      const response = await materialService.saveMaterials(stubInput);

      expect(stub.calledOnce).to.be.true;
      expect(response.rowCount).to.be.equal(expectedOutput.rowCount);
    });
  });

  describe('updateMaterials', function() {
    it('should update materials of the construction site', async function() {
      const stubData = [{
        material_id: faker.datatype.number(),
        material: {
          name: faker.name.findName(),
          construction_site: faker.datatype.uuid(),
          volume_cubic_meter: faker.datatype.number(),
          cost_cubic_meter: faker.datatype.number(),
          color: faker.commerce.color(),
          delivery_date: faker.date.future(),
        }
      }];

      const materialRepo = new MaterialRepository();
      // this runs the stub that simulates the database operation
      const stub = sinon.stub(materialRepo, 'update').returns(true);

      const materialService = new MaterialService(materialRepo);
      const response = await materialService.updateMaterials(stubData);

      expect(stub.calledOnce).to.be.true;
      expect(response).to.be.equal(true);
    });
  });

  describe('deleteMaterials', function() {
    it('should delete materials of the construction site', async function() {
      const materialIds = [ faker.datatype.number(), faker.datatype.number() ];
      const expectedOutput = materialIds.length;

      const materialRepo = new MaterialRepository();
      // this runs the stub that simulates the database operation
      const stub = sinon.stub(materialRepo, 'deleteMaterials').returns(expectedOutput);

      const materialService = new MaterialService(materialRepo);
      const response = await materialService.deleteMaterials(materialIds);

      expect(stub.calledOnce).to.be.true;
      expect(response).to.be.equal(expectedOutput);
    });
  });
});
