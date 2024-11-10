import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss'
})
export class AddCustomerComponent {

  customerForm!: FormGroup;
  dataSet: any;
  regions: string[] = [];
  countries: string[] = [];
  loadingRegions = false;
  loadingCountries = false;
  ngxControl = new FormControl();
  
  constructor(
    private dataService: DataService,  
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      region: ['', [Validators.required]],
      country: ['', [Validators.required]],
    });
    this.loadReagionData()
  }

  loadReagionData(){
    this.loadingRegions = true;
    this.dataService.getRegions().subscribe(
      response => {
        this.dataSet = response.data;
        let reagionarr = []
        for (let code in this.dataSet) {
          if (this.dataSet.hasOwnProperty(code)) {
            reagionarr.push(this.dataSet[code].region)
          }
        }
        this.regions = [...new Set(reagionarr)]
        this.loadingRegions = false;
      },
      error => {
        console.error('Error fetching regions', error);
        this.loadingRegions = false;
      }
    );
  }

  // Fetch countries based on the selected region
  loadCountriesByRegion(): void {
    const selectedRegion = this.customerForm.value.region;
    console.log('selectedRegion:',selectedRegion);

    for (let code in this.dataSet) {
      if (this.dataSet.hasOwnProperty(code) && this.dataSet[code].region === selectedRegion) {
        this.countries.push(this.dataSet[code].country);
      }
    }

    console.log('countriesInRegion:',this.countries);
  }

  submitForm(): void {
    if (this.customerForm.valid) {
      const customerData = this.customerForm.value;
      this.localStorageService.saveCustomer(customerData);
      this.customerForm.reset()
      alert(`Customer Added Succefully..`)
    } else {
      console.log('Form is invalid');
    }
  }
}
