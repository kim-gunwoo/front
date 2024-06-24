/**
 * Intersection
 *
 * And
 */
interface Human {
  name: string;
  age: number;
}

interface Contacts {
  phone: string;
  address: string;
}

type HumanAndContacts = Human & Contacts;

let humanAndContacts: HumanAndContacts = {
  name: "한국인",
  age: 32,
  phone: "01012341234",
  address: "서울시",
};

type NumberAndString = number & string;

// let numberAndString: NumberAndString = never;
