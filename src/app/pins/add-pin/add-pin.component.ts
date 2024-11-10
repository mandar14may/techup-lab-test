import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileItem, FileUploader } from 'ng2-file-upload';
import { LocalStorageService } from '../../services/local-storage.service';


const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-add-pin',
  templateUrl: './add-pin.component.html',
  styleUrl: './add-pin.component.scss'
})
export class AddPinComponent {

  pinForm!: FormGroup;
  // uploader: FileUploader  = new FileUploader({});
  customers: any[] = ['A','B','C'];
  privacyOptions = ['Public', 'Private'];

  uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: false,
    autoUpload: false,
    isHTML5: true,
    queueLimit: 1 // Limit to single file
  });

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {
    this.uploader.onAfterAddingFile = (file: FileItem) => {
      file.withCredentials = false;
      // Remove previously selected file if a new one is selected
      if (this.uploader.queue.length > 1) {
        this.uploader.removeFromQueue(this.uploader.queue[0]);
      }
    };

    this.uploader.onCompleteItem = (item, response, status, headers) => {
      console.log('File uploaded:', item, status, response);
    };
  }

  ngOnInit(): void {
    this.pinForm = this.fb.group({
      title: ['', Validators.required],
      image: ['', Validators.required],
      collaborators: [[], Validators.required],
      privacy: ['Public', Validators.required],
    });

    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customers = this.localStorageService.getCustomers();
    console.log('customers',this.customers)
  }

  submitForm(): void {
    if (this.pinForm.valid) {
      const pinData = this.pinForm.value;
      this.localStorageService.savePin(pinData);
      console.log('Pin Data:', pinData);
      this.pinForm.reset()
      alert(`Customer Added Succefully..`)
      // Save to local storage or send to the backend as needed
    } else {
      console.log('Form is invalid');
    }
  }

}
