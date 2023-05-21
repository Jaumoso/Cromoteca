import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  ngOnInit(): void {
      // Vacío de forma intencional
  }

  seccionActiva = '';
  @ViewChild('contenido1', { static: true }) contenido1: ElementRef | undefined;
  @ViewChild('contenido2', { static: true }) contenido2: ElementRef | undefined;
  @ViewChild('contenido3', { static: true }) contenido3: ElementRef | undefined;
  @ViewChild('contenido4', { static: true }) contenido4: ElementRef | undefined;
  @ViewChild('contenido5', { static: true }) contenido5: ElementRef | undefined;
  @ViewChild('contenido6', { static: true }) contenido6: ElementRef | undefined;
  @ViewChild('contenido7', { static: true }) contenido7: ElementRef | undefined;
  @ViewChild('contenido8', { static: true }) contenido8: ElementRef | undefined;

  toggleContent(id: string) {
    const contenidoEl = this.getContenidoElementById(id);

    if (this.seccionActiva === id) {
      this.seccionActiva = '';
      contenidoEl.style.display = 'none';
    } else {
      this.seccionActiva = id;
      contenidoEl.style.display = 'block';
    }
  }

  ngAfterViewInit() {
    this.getContenidoElementById(this.seccionActiva).style.display = 'block';
  }

  private getContenidoElementById(id: string): HTMLElement {
    switch (id) {
      case 'seccion1': return this.contenido1?.nativeElement;
      case 'seccion2': return this.contenido2?.nativeElement;
      case 'seccion3': return this.contenido3?.nativeElement;
      case 'seccion4': return this.contenido4?.nativeElement;
      case 'seccion5': return this.contenido5?.nativeElement;
      case 'seccion6': return this.contenido6?.nativeElement;
      case 'seccion7': return this.contenido7?.nativeElement;
      case 'seccion8': return this.contenido8?.nativeElement;
      default: throw new Error(`No se encontró la sección con el id '${id}'`);
    }
  }

  // función para hacer scroll hasta el elemento pulsado
  scroll(id: string) {
    let element = document.getElementById(id);
    element!.scrollIntoView({behavior: 'smooth'});
  }
}
