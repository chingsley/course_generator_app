import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

declare module '@/config/firebaseConfig' {
  export const auth: Auth;
  export const db: Firestore;
}