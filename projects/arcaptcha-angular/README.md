# Angular Arcaptcha Component Library

## Description
Arcaptcha Component Library for Angular.

[Arcaptcha](https://arcaptcha.ir/) is a drop-replacement for reCAPTCHA and hCaptcha that protects user privacy, rewards websites, and helps companies get their data labeled.

Sign up at [Arcaptcha](https://arcaptcha.ir/sign-up) to get your sitekey today. You need a **sitekey** to use this library.

## Installation
You can install this library via npm with:

```
  npm i arcaptcha-angular 
```

## Usage
The requirement for usage are the siteـkey prop. The component will automatically include and load the Arcaptcha  API library and append it to the body.

```
/// X.component.ts
import { Component, ViewChild } from '@angular/core';
import { ArcaptchaAngularComponent } from 'arcaptcha-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

})

export class AppComponent {

  @ViewChild(ArcaptchaAngularComponent)
  private widget!: ArcaptchaAngularComponent;

  exec(){
    this.widget.execute();
  }

  callbackFunction(){
  } 
  
  renderCallback(){
  } 
}

```

```
/// X.component.html

<lib-arcaptcha-angular 
    #widget 
    [site_key]="YOUR_SITE_KEY" 
    [callback]="callbackFunction"
    [rendered_callback]="renderCallback"
    [invisible]=true  
    [lang]="'en'"   
    [theme]="'dark'">
</lib-arcaptcha-angular>


```

## Props

| Name | Values/Type | Required	| Default	 | Description |
|--------|--------|--------|--------|--------|
|    site_key    |    string   |    Yes   |    -   |    This is your sitekey, this allows you to load captcha. If you need a sitekey, please visit [Arcaptcha](https://arcaptcha.ir/sign-up), and sign up to get your sitekey   |
|    invisible    |    Boolean    |  NO  |  False | This allows you to use invisible captcha for you forms |
|    lang    |    string    |  NO  |  persion  | This allows you to choose language by this prop. you can choose 'en' or 'fa' for english and persion language | 
|    theme    |    string    |  NO  |  light  | This allows you to choose theme for your widget. The themes are light and dark  | 
|    callback    |    Function    |  NO  |  null  | This function would be called after solving captcha |  
|    rendered_callback    |    Function    |  NO  |  null  | This function would be called after rendering captcha |  
|    error_callback    |    Function    |  NO  |  null  | This function would be called after error |  
|    reset_callback    |    Function    |  NO  |  null  | This function would be called after reseting captcha |  
|    expired_callback    |    Function    |  NO  |  null  | This function would be called after expiring |  
|    chlexpired_callback    |    Function    |  NO  |  null  | This function would be called after challange expiration |  


## Methods

| Method | Description |
|--------|--------|
|    execute    |    Programmatically trigger a challenge request. You can use this, to load invisible captcha after trigger a button  |
|    resetCaptcha    |    	Reset the current challenge    |
