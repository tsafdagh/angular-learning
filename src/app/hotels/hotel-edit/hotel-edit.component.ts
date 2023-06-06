import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelListServiceService } from '../shared/services/hotel-list.service';
import { IHotel } from '../shared/models/hotel';
import { EMPTY, Observable, catchError, debounce, debounceTime, fromEvent, merge, timer } from 'rxjs';
import { GlobalGenericValidator } from '../shared/validators/global-generic.validators';
import { NumberValidators } from '../shared/validators/numbers.validator';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) inputElements!: ElementRef[]

  public hotelForm!: FormGroup;
  public hotel: IHotel | undefined;
  public pageTitle = ""
  public errorMsg?: string

  public formErrors: { [key: string]: string } = {}

  private globalGenericValidator?: GlobalGenericValidator;
  private isFormSubmited: boolean = false

  private validationMessage: { [key: string]: { [key: string]: string } } = {
    hotelName: {
      required: 'Le nom de l\' hotel est obligatoire',
      minlength: 'Le nom de l\' hotel doit comporter au moins 4 caractères'
    },
    price: {
      required: 'Le prix de l\'hotel est obligatoire!'
    },
    rating: {
      range: 'Donnez une note comprise entre 1 et 5'
    }
  }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelListServiceService
  ) { }

  ngOnInit(): void {

    this.globalGenericValidator = new GlobalGenericValidator(this.validationMessage)
    this.hotelForm = this.fb.group({
      hotelName: ["", [Validators.required, Validators.minLength(4)]],
      price: ["", Validators.required],
      rating: ["", NumberValidators.range(1, 5)],
      description: [""],
      tags: this.fb.array([])
    })


    this.route.paramMap.subscribe(params => {
      const id: string | null = params.get("id")

      if (id != null) {
        this.getSelectedHotel(+id)
      }

    })
  }

  ngAfterViewInit(): void {
    //Recuperation de tous les évènement blur du formulaire
    const formControlBlur: Observable<unknown>[] = this.inputElements
      .map((formControlElmRef: ElementRef) => fromEvent(formControlElmRef.nativeElement, 'blur'))

    //Merge permet de combiner plier observables
    merge(this.hotelForm.valueChanges, ...formControlBlur)
      .pipe(
        //debounceTime(800)
        debounce(() => this.isFormSubmited ? EMPTY : timer(800))
      )
      .subscribe(() => {
        this.formErrors = this.globalGenericValidator!!.createErrorMessage(this.hotelForm, this.isFormSubmited);
      })
  }

  public get tags(): FormArray {
    return this.hotelForm.get("tags") as FormArray
  }

  public addTags(): void {
    this.tags.push(new FormControl())
  }

  public deleteTag(index: number): void {
    this.tags.removeAt(index)
    this.tags.markAsDirty()
  }

  public saveHotels(): void {

    this.isFormSubmited = true
    this.hotelForm.updateValueAndValidity({ onlySelf: true, emitEvent: true })


    if (this.hotelForm.valid) {
      //Si le formulaire est valide
      if (this.hotelForm.dirty) {
        //SI le formulaire contient au moins une valeure

        const hotel: IHotel = {
          ... this.hotel,
          ... this.hotelForm.value
        };

        if (hotel.id === 0) {
          //Création d'un hotel
          this.hotelService.createHotels(hotel).subscribe({
            next: () => this.saveCompleted(),
            error: (err) => this.errorMsg = err
          });
        } else {
          //mise à jours d'un hotel
          this.hotelService.updateHotel(hotel).subscribe({
            next: () => this.saveCompleted(),
            error: (err) => this.errorMsg = err
          });
        }
      }
    } else {
      this.errorMsg = 'Corrigez les érreures SVP!!'
    }


  }

  public saveCompleted(): void {
    this.hotelForm.reset();
    this.router.navigate(['/hotels'])
  }

  public getSelectedHotel(id: number): void {

    this.hotelService.getHotelById(id).subscribe((hotel => {

      if (hotel != undefined) {
        this.displayHotel(hotel)
      } else {
        this.pageTitle = "Modifier hotel"
      }

    }))
  }

  public deleteHotel(): void {

    if (this.hotel) {

      if (confirm(`Voulez vous vraiment supprimer l'hotel ${this.hotel?.hotelName} ?`)) {

        this.hotelService.deleteHotel(this.hotel.id).subscribe(
          {
            next: () => this.saveCompleted()
          }
        )
      }
    }
  }

  public displayHotel(hotel: IHotel): void {
    this.hotel = hotel

    if (hotel.id !== 0) {
      this.pageTitle = "Modifier hotel"
    } else {
      this.pageTitle = "Créer hotel"
    }


    this.hotelForm.patchValue({
      hotelName: hotel.hotelName,
      price: hotel.price,
      rating: hotel.rating,
      description: hotel.description
    })
    this.hotelForm.setControl('tags', this.fb.array(this.hotel.tags || []))
  }

  public hideError(): void {
    this.errorMsg = ""
  }

}
