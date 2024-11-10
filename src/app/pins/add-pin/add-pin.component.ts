import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileItem, FileLikeObject, FileUploader } from 'ng2-file-upload';
import { LocalStorageService } from '../../services/local-storage.service';


const URL = '';

@Component({
  selector: 'app-add-pin',
  templateUrl: './add-pin.component.html',
  styleUrl: './add-pin.component.scss'
})
export class AddPinComponent {

  pinForm!: FormGroup;
  customers: any[] = ['A','B','C'];
  privacyOptions = ['Public', 'Private'];

  // uploader: FileUploader = new FileUploader({
  //   url: URL,
  //   disableMultipart: false,
  //   autoUpload: false,
  //   isHTML5: true,
  //   queueLimit: 1 // Limit to single file
  // });
  
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  hasAnotherDropZoneOver:boolean;
  response:string;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {
    // this.uploader.onAfterAddingFile = (file: FileItem) => {
    //   file.withCredentials = false;
    //   // Remove previously selected file if a new one is selected
    //   if (this.uploader.queue.length > 1) {
    //     this.uploader.removeFromQueue(this.uploader.queue[0]);
    //   }
    // };
    // this.uploader.onCompleteItem = (item, response, status, headers) => {
    //   console.log('File uploaded:', item, status, response);
    //   // After upload complete, save the image to localStorage
    //   // this.saveImageToLocalStorage(item.file);
    // };
  
    this.uploader = new FileUploader({
      url: URL,
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item: any) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });
 
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;
 
    this.response = '';
 
    this.uploader.response.subscribe( res => this.response = res );

  }

  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
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

  // Handle file upload and convert to base64 before saving to localStorage
  saveImageToLocalStorage(file: FileLikeObject): void {
    const fileToUpload = file as unknown as File;

    const reader = new FileReader();
    reader.onloadend = () => {
      // Convert the file to base64 string
      const base64Image = reader.result as string;
      // Save the base64 image to localStorage
      localStorage.setItem('uploadedImage', base64Image);
      console.log('Image saved in localStorage');
      // After saving, update the form control with the image base64
      this.pinForm.patchValue({
        image: base64Image
      });
    };
    reader.readAsDataURL(fileToUpload); // Convert the file to base64
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
