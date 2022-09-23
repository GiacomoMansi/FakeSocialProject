import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSalvatiComponent } from './post-salvati.component';

describe('PostSalvatiComponent', () => {
  let component: PostSalvatiComponent;
  let fixture: ComponentFixture<PostSalvatiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostSalvatiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostSalvatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
