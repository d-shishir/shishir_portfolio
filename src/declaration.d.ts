declare module "emailjs-com" {
  export interface EmailJSResponseStatus {
    status: number;
    text: string;
  }

  export function sendForm(
    serviceID: string,
    templateID: string,
    form: HTMLFormElement,
    userID: string
  ): Promise<EmailJSResponseStatus>;
}
