import { Injectable, Injector } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { OverlayComponent } from '../components/overlay/overlay.component';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor(private overlay: Overlay, private injector: Injector) { }

  open(): OverlayRef {
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      panelClass: 'overlay-panel',
      backdropClass: 'overlay-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });
    const injector = Injector.create({
      providers: [{ provide: OverlayRef, useValue: overlayRef }]
    });
    overlayRef.attach(
      new ComponentPortal(OverlayComponent, null, injector)
    );
    overlayRef.backdropClick().subscribe(() => {
      overlayRef.dispose();
    });
    return overlayRef;
  }
}
