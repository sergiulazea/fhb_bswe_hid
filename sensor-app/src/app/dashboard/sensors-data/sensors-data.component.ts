import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sensor, SensorPosition } from 'src/app/Sensor';
import { Sensorendata } from 'src/app/Sensorendata';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';

@Component({
  selector: 'app-sensors-data',
  templateUrl: './sensors-data.component.html',
  styleUrls: ['./sensors-data.component.scss']
})
export class SensorsDataComponent implements OnInit {

  public get SensorPosition() { return SensorPosition; }

  dataSource: any = [];

  pageSizes = [10, 20, 40, 100];

  @ViewChild('paginator') paginator!: MatPaginator;

  columnsToDisplay = ['name', 'date', 'temperature', 'humidity', 'location', 'position'];

  constructor(private backendService: BackendService, public storeService: StoreService, private ref: ChangeDetectorRef) { }

  public pages: number = 0;
  public currentPage: number = 1;

  async ngOnInit() {
    await this.backendService.getSensoren();
    await this.backendService.getSensorenDaten();
    this.dataSource = new MatTableDataSource(this.storeService.sensorenDaten);
    this.dataSource.paginator = this.paginator;
    console.log(this.storeService.sensorenDaten.length)
    this.refresh()
  }

  async deleteSensordata(id: number) {
    await this.backendService.deleteSensorsDaten(id);
  }

  async refresh() {
    this.storeService.sensorenDaten
  }
}


