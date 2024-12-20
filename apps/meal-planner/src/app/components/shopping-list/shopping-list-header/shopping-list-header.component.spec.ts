import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingListHeaderComponent } from './shopping-list-header.component';

describe('ShoppingListHeaderComponent', () => {
  let component: ShoppingListHeaderComponent;
  let fixture: ComponentFixture<ShoppingListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingListHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
