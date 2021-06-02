export interface ContactDetails {
    firstName: string,
    lastName: string,
    contactType: "Phone" | "Mobile" | "Landline",
    number: number
    isfavorite: boolean
}