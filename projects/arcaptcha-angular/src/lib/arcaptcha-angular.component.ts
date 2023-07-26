import { Component, OnInit, Input } from '@angular/core';

declare global {
  interface Window {
    arcaptchaWidgetLoading: any; // 👈️ turn off type checking
  }
}

@Component({
  selector: 'lib-arcaptcha-angular',
  template: '<div id={{id}} href="arcaptcha"></div>',
})
export class ArcaptchaAngularComponent implements OnInit {
  constructor() {}

  @Input() public callback: Function;
  @Input() public rendered_callback : Function;
  @Input() public error_callback : Function;
  @Input() public reset_callback : Function;
  @Input() public expired_callback : Function;
  @Input() public chlexpired_callback : Function;
  @Input() site_key = '';
  @Input() lang = 'fa';
  @Input() theme = 'light';
  @Input() invisible = false;
  @Input() color = 'normal';

  id: string = '';
  widget_id: string = '';

  ngOnInit(): void {
    this.setID();
    var my_script = document.head.querySelector(
      '#arcptcha-script'
    ) as HTMLScriptElement | null;
    const script = my_script || document.createElement('script');

    if (!my_script) {
      window.arcaptchaWidgetLoading = new Promise<void>((resolve, reject) => {

        script.src = `https://widget.arcaptcha.ir/1/api.js`;
        script.id = 'arcptcha-script';
        script.defer = true;
        script.async = true;

        script.onload = () => {
          resolve();
          this.initialize();
        };
      });
    }
    if (my_script) {
      window.arcaptchaWidgetLoading.then(() => {
        this.initialize();
      });
    }
    if (!my_script) {
      document.head.appendChild(script);
    }
  }

  initialize() {
    this.loadCaptcha();
    window.addEventListener(
      'arcaptcha-token-changed-' + this.widget_id,
      (event) => {
        /* this.onsetChallengeId.emit((<any>event).detail)  */
      }
    );
  }
  registerCallback() {
    if (this.callback){
      (window as { [key: string]: any })['arcaptcha_callback_' + this.id] =
        this.callback;
    }
    if (this.rendered_callback)
      (window as { [key: string]: any })[
        'arcaptcha_rendered_callback_' + this.id
      ] = this.rendered_callback;
    if (this.error_callback)
      (window as { [key: string]: any })[
        'arcaptcha_error_callback_' + this.id
      ] = this.error_callback;
    if (this.reset_callback)
      (window as { [key: string]: any })[
        'arcaptcha_reset_callback_' + this.id
      ] = this.reset_callback;
    if (this.expired_callback)
      (window as { [key: string]: any })[
        'arcaptcha_expired_callback_' + this.id
      ] = this.expired_callback;
    if (this.chlexpired_callback)
      (window as { [key: string]: any })[
        'arcaptcha_chlexpired_callback_' + this.id
      ] = this.chlexpired_callback;
  }
  loadCaptcha() {
    this.registerCallback()
    const widgetId = (window as any).arcaptcha.render('#' + this.id, {
      'site-key': this.site_key,
      lang: this.lang,
      theme: this.theme,
      size: this.invisible ? 'invisible' : '',
      callback:this.callback?'arcaptcha_callback_' + this.id :null,
      rendered_callback:this.rendered_callback?'arcaptcha_rendered_callback_' + this.id :null,
      error_callback:this.error_callback?'arcaptcha_error_callback_' + this.id:null ,
      reset_callback:this.reset_callback?'arcaptcha_reset_callback_' + this.id:null ,
      expired_callback:this.expired_callback?'arcaptcha_expired_callback_' + this.id:null ,
      chlexpired_callback:this.chlexpired_callback?'arcaptcha_chlexpired_callback_' + this.id:null ,
      color: this.color,
    });
    this.widget_id = widgetId;
  }

  getRandomID() {
    return (
      new Date().getTime().toString(36) + Math.random().toString(36).slice(2)
    );
  }

  setID() {
    this.id = 'arcaptcha-widget-' + this.getRandomID();
  }

  resetCaptcha() {
    return (window as any).arcaptcha.reset(this.widget_id);
  }

  execute() {
    return (window as any).arcaptcha.execute(this.widget_id);
  }
}
