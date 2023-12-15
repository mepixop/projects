import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipeUpsertComponent } from './recipe-upsert.component';

describe('RecipeUpsertComponent', () => {
  let component: RecipeUpsertComponent;
  let fixture: ComponentFixture<RecipeUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeUpsertComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipeUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
