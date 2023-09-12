import { LookupModel } from '../components/lookup.component';

export declare interface ILookup {
  getComponent(): any;
  objeto_selecionado?: LookupModel;
  onLimpar(): void;
}
