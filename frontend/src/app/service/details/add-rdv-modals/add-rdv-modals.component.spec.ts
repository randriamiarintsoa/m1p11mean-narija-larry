import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { ButtonModule, CardModule, GridModule, ModalModule, PopoverModule, TooltipModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../../icons/icon-subset';
import { DocsComponentsModule } from '../../../../components';
import { AddRdvModalsComponent } from './add-rdv-modals.component';

describe('AddRdvModalsComponent', () => {
  let component: AddRdvModalsComponent;
  let fixture: ComponentFixture<AddRdvModalsComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRdvModalsComponent],
      imports: [ModalModule, NoopAnimationsModule, GridModule, CardModule, PopoverModule, ButtonModule, DocsComponentsModule, RouterTestingModule, TooltipModule],
      providers: [IconSetService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(AddRdvModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
