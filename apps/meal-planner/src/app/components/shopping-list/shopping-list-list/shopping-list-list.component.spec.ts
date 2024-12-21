import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingListListComponent } from './shopping-list-list.component';
import { ShoppingListItemComponent } from './shopping-list-item/shopping-list-item.component';
describe('ShoppingListListComponent', () => {
  let component: ShoppingListListComponent;
  let fixture: ComponentFixture<ShoppingListListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShoppingListListComponent, ShoppingListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShoppingListListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
