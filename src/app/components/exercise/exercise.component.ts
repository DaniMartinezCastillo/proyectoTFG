import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Storage, ref, listAll, getDownloadURL, list } from '@angular/fire/storage';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent {

  images!: string[];
  img1!: string;
  img2!: string;

  constructor(
    private storage: Storage,
    private dialogRef: MatDialogRef<ExerciseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(){
    this.images = [];
    this.getImages(this.data.muscle.name, this.data.exercise.name);
  }

  getImages(muscle: string, exercise: string) {
    let reference = muscle + "/" + exercise;
    const imagesRef = ref(this.storage, reference);

    listAll(imagesRef)
      .then( async resp=>{
        this.images = [];
        for(let item of resp.items){
          const url = await getDownloadURL(item);
          this.images.push(url);
        }
        this.img1 = this.images[0];
        this.img2 = this.images[1];
      }).catch(error=>{
        console.log(error);
      });
  }
  close(){
    this.dialogRef.close();
  }
}
