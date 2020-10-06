import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesweeperMainComponent } from './minesweeper-main.component';

describe('MinesweeperMainComponent', () => {
  let component: MinesweeperMainComponent;
  let fixture: ComponentFixture<MinesweeperMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinesweeperMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinesweeperMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
