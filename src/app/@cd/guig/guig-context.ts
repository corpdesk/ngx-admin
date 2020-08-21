/**
 * 
 * GUIG CONTEXT
 * this is responsible to set the mode of the guig.
 * - it should always be possible to restore ui template to its original state
 * - it should always be possible to configure different types of modes to suite different needs and clients
 * - all the above should be possible by just selecting a given mode.
 * by @georemo
 */

import { Injectable } from '@angular/core';

interface iMode{
    name: string;
    info?: string;
    changableTheme?: boolean;
    active: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class GuigContextService {
    currentMode;
    modeOptions = [
        {
            name: 'ngx-admin-original',
            info: 'restore original behaviour of gui template',
            changableTheme: true,
            active: true
        },
        {
            name: 'ngx-admin-mod1',
            info: 'the initial modification including cd-auth and cd-menu',
            changableTheme: false,
            active: false
        }
    ];
    constructor() {

    }

    getMode() {
        let filteredMode = this.modeOptions.filter(function (m, index) {
            /**
             * act on 'active' property only if it is available
             */
            if('active' in m){
              /**
               * do not return modes that are not active
               */
              if(m.active == false){
                return false;
              }
            };
            return true;
          });
      
          console.log('filteredMode:', JSON.stringify(filteredMode));
          this.currentMode = filteredMode[0];
          return this.currentMode;
    }

    setMode(m: iMode) {
        this.currentMode[m.name] = m;
    }
}