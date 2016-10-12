/**Como la aplicación Angular es Web importamos el módulo platformBrowserDynamic */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
/**Importamos el modulo que define a nuestra aplicación */
import { AppModule } from './app.module';
/**Instanciamos el modulo platformBrowserDynamic*/
const platform = platformBrowserDynamic();
/**Iniciamos la aplicación haciendo uso del método bootstrapModule del modulo platformBrowserDynamic*/
platform.bootstrapModule(AppModule);
