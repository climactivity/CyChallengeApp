
export interface NewsetterSignupParams {
  email: string;
  first_name?: string;
  last_name?: string;
  country?: string;
  region?: string;
  city?: string;
  lists?: NewsletterList[];
  list_N?: number;
  extra_fields?: Extrafield[];
  gender?: string;
  optin?: "single" | "double";
}

export interface Extrafield {
  id: number;
  value: string;
}

export interface NewsletterList {
  id: number;
  value: number;
}

const newsletterSignupEndpoint = import.meta.env.VITE_NEWSLETTER_SIGNUP_ENDPOINT ?? ""

export const newsletterSignup = async (subscription: NewsetterSignupParams) => {

    return fetch(newsletterSignupEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
        referrer: "https://app.climactivity.de"
    }).then(async res => {
      if (res.status > 399 ) {
        return Promise.reject(await res.json())
      }
        return res.status
    }).catch(e => {
        return Promise.reject(e?.message)
    })
}