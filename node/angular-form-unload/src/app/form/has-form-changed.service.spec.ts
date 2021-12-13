import { HasFormChangedService } from './has-form-changed.service';

let formChangesService = new HasFormChangedService();

describe('FormChangesService', () => {
  beforeEach(() => {
    formChangesService = new HasFormChangedService();
    expect(formChangesService.haveFormsBeenChanged()).toBeFalsy();
  });

  describe('add form', () => {
    it('should return false when new form is added', () => {
      formChangesService.registerNewForm('');
      expect(formChangesService.haveFormsBeenChanged()).toBeFalsy();
    });
  });

  describe('set form state', () => {
    it('should return true when form is added and then changed', () => {
      const id = formChangesService.registerNewForm('');
      formChangesService.setCurrentFormState(id, 'new');
      expect(formChangesService.haveFormsBeenChanged()).toBeTruthy();
    });
    it('should return false when form is added and changed to same value', () => {
      const id = formChangesService.registerNewForm('state');
      formChangesService.setCurrentFormState(id, 'state');
      expect(formChangesService.haveFormsBeenChanged()).toBeFalsy();
    });
    it('should throw error when form is added, when id is not present', () => {
      try {
        formChangesService.setCurrentFormState('1', 'state');
      } catch (e: any) {
        expect(e.message).toEqual(HasFormChangedService.ERROR_MSG);
      }
    });
  });

  describe('reset state', () => {
    it('should throw error when form is reset, whose id is not present', () => {
      try {
        formChangesService.setFormState('1');
      } catch (e: any) {
        expect(e.message).toEqual(HasFormChangedService.ERROR_MSG);
      }
    });
    it('reseting form who has changes sets haveFormsBeenChanged to false', () => {
      const id = formChangesService.registerNewForm('state');
      formChangesService.setFormState(id);
      expect(formChangesService.haveFormsBeenChanged()).toBeFalsy();
    });
  });

  describe('remove form', () => {
    it('should throw error when form is removed, when id is not present', () => {
      try {
        formChangesService.removeForm('1');
      } catch (e: any) {
        expect(e.message).toEqual(HasFormChangedService.ERROR_MSG);
      }
    });
    it('can remove form', () => {
      const id = formChangesService.registerNewForm('state');
      expect(formChangesService.haveFormsBeenChanged()).toBeFalsy();
      formChangesService.removeForm(id);
      expect(formChangesService.haveFormsBeenChanged()).toBeFalsy();
    });
    it('removing only form who has changes sets haveFormsBeenChanged to false', () => {
      const id = formChangesService.registerNewForm('state');
      formChangesService.setCurrentFormState(id, true);
      expect(formChangesService.haveFormsBeenChanged()).toBeTruthy();
      formChangesService.removeForm(id);
      expect(formChangesService.haveFormsBeenChanged()).toBeFalsy();
    });
    it('removing form who has changes sets haveFormsBeenChanged to false when other forms remain changed', () => {
      const id1 = formChangesService.registerNewForm('state');
      formChangesService.setCurrentFormState(id1, 'newState');
      expect(formChangesService.haveFormsBeenChanged()).toBeTruthy();
      const id2 = formChangesService.registerNewForm('state');
      formChangesService.setCurrentFormState(id2, 'newState');
      expect(formChangesService.haveFormsBeenChanged()).toBeTruthy();
      formChangesService.removeForm(id1);
      expect(formChangesService.haveFormsBeenChanged()).toBeTruthy();
    });
  });

  describe('clear form', () => {
    it('should change form ', () => {
      const id = formChangesService.registerNewForm('state');
      formChangesService.setCurrentFormState(id, 'newState');
      formChangesService.registerNewForm();
      expect(formChangesService.haveFormsBeenChanged()).toBeTruthy();
      formChangesService.clearForms();
      expect(formChangesService.haveFormsBeenChanged()).toBeFalsy();
    });
  });
});
