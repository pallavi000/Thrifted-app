import React, { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext();

let districtsArray = [
  {
    id: 1,
    name: "Bhojpur",
    province_id: "1",
  },
  {
    id: 2,
    name: "Dhankuta",
    province_id: "1",
  },
  {
    id: 3,
    name: "Ilam",
    province_id: "1",
  },
  {
    id: 4,
    name: "Jhapa",
    province_id: "1",
  },
  {
    id: 5,
    name: "Khotang",
    province_id: "1",
  },
  {
    id: 6,
    name: "Morang",
    province_id: "1",
  },
  {
    id: 7,
    name: "Okhaldhunga",
    province_id: "1",
  },
  {
    id: 8,
    name: "Panchthar",
    province_id: "1",
  },
  {
    id: 9,
    name: "Sankhuwasabha",
    province_id: "1",
  },
  {
    id: 10,
    name: "Solukhumbu",
    province_id: "1",
  },
  {
    id: 11,
    name: "Sunsari",
    province_id: "1",
  },
  {
    id: 12,
    name: "Taplejung",
    province_id: "1",
  },
  {
    id: 13,
    name: "Terhathum",
    province_id: "1",
  },
  {
    id: 14,
    name: "Udayapur",
    province_id: "1",
  },
  {
    id: 15,
    name: "Bara",
    province_id: "2",
  },
  {
    id: 16,
    name: "Dhanusha",
    province_id: "2",
  },
  {
    id: 17,
    name: "Mahottari",
    province_id: "2",
  },
  {
    id: 18,
    name: "Parsa",
    province_id: "2",
  },
  {
    id: 19,
    name: "Rautahat",
    province_id: "2",
  },
  {
    id: 20,
    name: "Saptari",
    province_id: "2",
  },
  {
    id: 21,
    name: "Sarlahi",
    province_id: "2",
  },
  {
    id: 22,
    name: "Siraha",
    province_id: "2",
  },
  {
    id: 23,
    name: "Bhaktapur",
    province_id: "3",
  },
  {
    id: 24,
    name: "Chitwan",
    province_id: "3",
  },
  {
    id: 25,
    name: "Dhading",
    province_id: "3",
  },
  {
    id: 26,
    name: "Dolakha",
    province_id: "3",
  },
  {
    id: 27,
    name: "Kathmandu",
    province_id: "3",
  },
  {
    id: 28,
    name: "Kavrepalanchok",
    province_id: "3",
  },
  {
    id: 29,
    name: "Lalitpur",
    province_id: "3",
  },
  {
    id: 30,
    name: "Makawanpur",
    province_id: "3",
  },
  {
    id: 31,
    name: "Nuwakot",
    province_id: "3",
  },
  {
    id: 32,
    name: "Ramechhap",
    province_id: "3",
  },
  {
    id: 33,
    name: "Rasuwa",
    province_id: "3",
  },
  {
    id: 34,
    name: "Sindhuli",
    province_id: "3",
  },
  {
    id: 35,
    name: "Sindhupalchok",
    province_id: "3",
  },
  {
    id: 36,
    name: "Baglung",
    province_id: "4",
  },
  {
    id: 37,
    name: "Gorkha",
    province_id: "4",
  },
  {
    id: 38,
    name: "Kaski",
    province_id: "4",
  },
  {
    id: 39,
    name: "Lamjung",
    province_id: "4",
  },
  {
    id: 40,
    name: "Manang",
    province_id: "4",
  },
  {
    id: 41,
    name: "Mustang",
    province_id: "4",
  },
  {
    id: 42,
    name: "Myagdi",
    province_id: "4",
  },
  {
    id: 43,
    name: "Nawalpur",
    province_id: "4",
  },
  {
    id: 44,
    name: "Parbat",
    province_id: "4",
  },
  {
    id: 45,
    name: "Syangja",
    province_id: "4",
  },
  {
    id: 46,
    name: "Tanahun",
    province_id: "4",
  },
  {
    id: 47,
    name: "Arghakhanchi",
    province_id: "5",
  },
  {
    id: 48,
    name: "Banke",
    province_id: "5",
  },
  {
    id: 49,
    name: "Bardiya",
    province_id: "5",
  },
  {
    id: 50,
    name: "Dang",
    province_id: "5",
  },
  {
    id: 51,
    name: "Eastern Rukum",
    province_id: "5",
  },
  {
    id: 52,
    name: "Gulmi",
    province_id: "5",
  },
  {
    id: 53,
    name: "Kapilvastu",
    province_id: "5",
  },
  {
    id: 54,
    name: "Parasi",
    province_id: "5",
  },
  {
    id: 55,
    name: "Palpa",
    province_id: "5",
  },
  {
    id: 56,
    name: "Pyuthan",
    province_id: "5",
  },
  {
    id: 57,
    name: "Rolpa",
    province_id: "5",
  },
  {
    id: 58,
    name: "Rupandehi",
    province_id: "5",
  },
  {
    id: 59,
    name: "Dailekh",
    province_id: "6",
  },
  {
    id: 60,
    name: "Dolpa",
    province_id: "6",
  },
  {
    id: 61,
    name: "Humla",
    province_id: "6",
  },
  {
    id: 62,
    name: "Jajarkot",
    province_id: "6",
  },
  {
    id: 63,
    name: "Jumla",
    province_id: "6",
  },
  {
    id: 64,
    name: "Kalikot",
    province_id: "6",
  },
  {
    id: 65,
    name: "Mugu",
    province_id: "6",
  },
  {
    id: 66,
    name: "Salyan",
    province_id: "6",
  },
  {
    id: 67,
    name: "Surkhet",
    province_id: "6",
  },
  {
    id: 68,
    name: "Western Rukum",
    province_id: "6",
  },
  {
    id: 69,
    name: "Achham",
    province_id: "7",
  },
  {
    id: 70,
    name: "Baitadi",
    province_id: "7",
  },
  {
    id: 71,
    name: "Bajhang",
    province_id: "7",
  },
  {
    id: 72,
    name: "Bajura",
    province_id: "7",
  },
  {
    id: 73,
    name: "Dadeldhura",
    province_id: "7",
  },
  {
    id: 74,
    name: "Darchula",
    province_id: "7",
  },
  {
    id: 75,
    name: "Doti",
    province_id: "7",
  },
  {
    id: 76,
    name: "Kailali",
    province_id: "7",
  },
  {
    id: 77,
    name: "Kanchanpur",
    province_id: "7",
  },
];
export const districts = districtsArray.sort(function (a, b) {
  return a.name.localeCompare(b.name); //using String.prototype.localCompare()
});

export const zipcodes = [
  {
    district: "Achham",
    city: "Achham",
    zipcode: "10700",
  },
  {
    district: "Achham",
    city: "Chaurpati",
    zipcode: "10701",
  },
  {
    district: "Achham",
    city: "Srikot",
    zipcode: "10702",
  },
  {
    district: "Achham",
    city: "Thanti",
    zipcode: "10703",
  },
  {
    district: "Achham",
    city: "Mellekh",
    zipcode: "10704",
  },
  {
    district: "Achham",
    city: "Bayalpata",
    zipcode: "10705",
  },
  {
    district: "Achham",
    city: "Bhatakatiya",
    zipcode: "10706",
  },
  {
    district: "Achham",
    city: "Jayagadh",
    zipcode: "10707",
  },
  {
    district: "Achham",
    city: "Kalagaun",
    zipcode: "10709",
  },
  {
    district: "Achham",
    city: "Kuchikot",
    zipcode: "10710",
  },
  {
    district: "Achham",
    city: "Kamal bazar",
    zipcode: "10711",
  },
  {
    district: "Achham",
    city: "Dhakari",
    zipcode: "10712",
  },
  {
    district: "Achham",
    city: "Turmakhad",
    zipcode: "10713",
  },
  {
    district: "Arghakhanchi",
    city: "Arghakhanchi",
    zipcode: "32700",
  },
  {
    district: "Arghakhanchi",
    city: "Balkot",
    zipcode: "32701",
  },
  {
    district: "Arghakhanchi",
    city: "Arghatosh",
    zipcode: "32702",
  },
  {
    district: "Arghakhanchi",
    city: "Khana",
    zipcode: "32703",
  },
  {
    district: "Arghakhanchi",
    city: "Wangla",
    zipcode: "32704",
  },
  {
    district: "Arghakhanchi",
    city: "Hamshapur",
    zipcode: "32705",
  },
  {
    district: "Arghakhanchi",
    city: "Thada",
    zipcode: "32706",
  },
  {
    district: "Arghakhanchi",
    city: "Khilji",
    zipcode: "32708",
  },
  {
    district: "Arghakhanchi",
    city: "Khidim",
    zipcode: "32709",
  },
  {
    district: "Arghakhanchi",
    city: "Pali",
    zipcode: "32710",
  },
  {
    district: "Arghakhanchi",
    city: "Dhikura",
    zipcode: "32711",
  },
  {
    district: "Arghakhanchi",
    city: "Argha",
    zipcode: "32712",
  },
  {
    district: "Arghakhanchi",
    city: "Subarnakhal",
    zipcode: "32713",
  },
  {
    district: "Baglung",
    city: "Baglung",
    zipcode: "33300",
  },
  {
    district: "Baglung",
    city: "Pala",
    zipcode: "33302",
  },
  {
    district: "Baglung",
    city: "Bihukot",
    zipcode: "33303",
  },
  {
    district: "Baglung",
    city: "Harichaur",
    zipcode: "33304",
  },
  {
    district: "Baglung",
    city: "Balewa Payupata",
    zipcode: "33305",
  },
  {
    district: "Baglung",
    city: "Jaidi Belbagar",
    zipcode: "33306",
  },
  {
    district: "Baglung",
    city: "Bereng",
    zipcode: "33307",
  },
  {
    district: "Baglung",
    city: "Galkot",
    zipcode: "33308",
  },
  {
    district: "Baglung",
    city: "Pandavkhani",
    zipcode: "33309",
  },
  {
    district: "Baglung",
    city: "Arnakot",
    zipcode: "33310",
  },
  {
    district: "Baglung",
    city: "Khrwang",
    zipcode: "33311",
  },
  {
    district: "Baglung",
    city: "Bongadovan",
    zipcode: "33312",
  },
  {
    district: "Baglung",
    city: "Jhimpa",
    zipcode: "33313",
  },
  {
    district: "Baglung",
    city: "Kusmi Shera",
    zipcode: "33314",
  },
  {
    district: "Baitadi",
    city: "Baitadi",
    zipcode: "10200",
  },
  {
    district: "Baitadi",
    city: "Kesharpur",
    zipcode: "10201",
  },
  {
    district: "Baitadi",
    city: "Patan",
    zipcode: "10202",
  },
  {
    district: "Baitadi",
    city: "Khodpe",
    zipcode: "10203",
  },
  {
    district: "Baitadi",
    city: "Mulkhatali",
    zipcode: "10204",
  },
  {
    district: "Baitadi",
    city: "Gajari Changgad",
    zipcode: "10205",
  },
  {
    district: "Baitadi",
    city: "Dehimandau",
    zipcode: "10207",
  },
  {
    district: "Baitadi",
    city: "Sharmali",
    zipcode: "10209",
  },
  {
    district: "Baitadi",
    city: "Srikot",
    zipcode: "10210",
  },
  {
    district: "Baitadi",
    city: "Dilasaini",
    zipcode: "10211",
  },
  {
    district: "Baitadi",
    city: "Swopana Taladehi",
    zipcode: "10212",
  },
  {
    district: "Baitadi",
    city: "Purchaudihat",
    zipcode: "10213",
  },
  {
    district: "Baitadi",
    city: "Sitad",
    zipcode: "10214",
  },
  {
    district: "Baitadi",
    city: "Dhungad",
    zipcode: "10215",
  },
  {
    district: "Bajhang",
    city: "Bajhang",
    zipcode: "10500",
  },
  {
    district: "Bajhang",
    city: "Talkot",
    zipcode: "10501",
  },
  {
    district: "Bajhang",
    city: "Jamatola",
    zipcode: "10502",
  },
  {
    district: "Bajhang",
    city: "Jaya Prithivi Nagar",
    zipcode: "10505",
  },
  {
    district: "Bajhang",
    city: "Chhanna",
    zipcode: "10506",
  },
  {
    district: "Bajhang",
    city: "Chaudhari",
    zipcode: "10507",
  },
  {
    district: "Bajhang",
    city: "Rayal",
    zipcode: "10508",
  },
  {
    district: "Bajhang",
    city: "Thalara",
    zipcode: "10509",
  },
  {
    district: "Bajhang",
    city: "Bungal",
    zipcode: "10510",
  },
  {
    district: "Bajhang",
    city: "Shayadi",
    zipcode: "10511",
  },
  {
    district: "Bajura",
    city: "Bajura",
    zipcode: "10600",
  },
  {
    district: "Bajura",
    city: "Dandakot",
    zipcode: "10602",
  },
  {
    district: "Bajura",
    city: "Jukot",
    zipcode: "10603",
  },
  {
    district: "Bajura",
    city: "Faiti",
    zipcode: "10604",
  },
  {
    district: "Bajura",
    city: "Kolti",
    zipcode: "10605",
  },
  {
    district: "Bajura",
    city: "Manakot",
    zipcode: "10606",
  },
  {
    district: "Bajura",
    city: "Dogadi",
    zipcode: "10607",
  },
  {
    district: "Bajura",
    city: "Tate",
    zipcode: "10608",
  },
  {
    district: "Bajura",
    city: "Chhatara",
    zipcode: "10609",
  },
  {
    district: "Banke",
    city: "Banke",
    zipcode: "21900",
  },
  {
    district: "Banke",
    city: "Suiya",
    zipcode: "21901",
  },
  {
    district: "Banke",
    city: "Bhojbhagawanpur",
    zipcode: "21902",
  },
  {
    district: "Banke",
    city: "Khaskusma",
    zipcode: "21903",
  },
  {
    district: "Banke",
    city: "Kohalapur",
    zipcode: "21904",
  },
  {
    district: "Banke",
    city: "Ramjha",
    zipcode: "21905",
  },
  {
    district: "Banke",
    city: "Udayapur",
    zipcode: "21907",
  },
  {
    district: "Banke",
    city: "Chisapani",
    zipcode: "21910",
  },
  {
    district: "Banke",
    city: "Godahana",
    zipcode: "21911",
  },
  {
    district: "Banke",
    city: "Jayaspur",
    zipcode: "21912",
  },
  {
    district: "Banke",
    city: "Khajura",
    zipcode: "21913",
  },
  {
    district: "Banke",
    city: "Chandranagar",
    zipcode: "21914",
  },
  {
    district: "Bara",
    city: "Bara",
    zipcode: "44400",
  },
  {
    district: "Bara",
    city: "Nijgadh",
    zipcode: "44401",
  },
  {
    district: "Bara",
    city: "Mahendra Adarsha",
    zipcode: "44402",
  },
  {
    district: "Bara",
    city: "Simraungadh",
    zipcode: "44403",
  },
  {
    district: "Bara",
    city: "Umjan",
    zipcode: "44404",
  },
  {
    district: "Bara",
    city: "Bariyarpur",
    zipcode: "44405",
  },
  {
    district: "Bara",
    city: "Kabahigoth",
    zipcode: "44406",
  },
  {
    district: "Bara",
    city: "Dumarwana",
    zipcode: "44408",
  },
  {
    district: "Bara",
    city: "Pipradhigoth",
    zipcode: "44410",
  },
  {
    district: "Bara",
    city: "Basantapur",
    zipcode: "44411",
  },
  {
    district: "Bara",
    city: "Simara",
    zipcode: "44412",
  },
  {
    district: "Bara",
    city: "Parsoni",
    zipcode: "44413",
  },
  {
    district: "Bara",
    city: "Amalekhgunj",
    zipcode: "44416",
  },
  {
    district: "Bara",
    city: "Jeetpur (Bhavanipur)",
    zipcode: "44417",
  },
  {
    district: "Bardiya",
    city: "Bardiya",
    zipcode: "21800",
  },
  {
    district: "Bardiya",
    city: "Jamuni",
    zipcode: "21801",
  },
  {
    district: "Bardiya",
    city: "Mainapokhar",
    zipcode: "21802",
  },
  {
    district: "Bardiya",
    city: "Motipur",
    zipcode: "21803",
  },
  {
    district: "Bardiya",
    city: "Magaragadi",
    zipcode: "21804",
  },
  {
    district: "Bardiya",
    city: "Baganaha",
    zipcode: "21808",
  },
  {
    district: "Bardiya",
    city: "Bhurigaun",
    zipcode: "21809",
  },
  {
    district: "Bardiya",
    city: "Rajapur",
    zipcode: "21811",
  },
  {
    district: "Bardiya",
    city: "Pashupatinagar",
    zipcode: "21813",
  },
  {
    district: "Bardiya",
    city: "Sanoshri",
    zipcode: "21814",
  },
  {
    district: "Bhaktapur",
    city: "Bhaktapur",
    zipcode: "44800",
  },
  {
    district: "Bhaktapur",
    city: "Dubakot",
    zipcode: "44802",
  },
  {
    district: "Bhaktapur",
    city: "Kharipati",
    zipcode: "44804",
  },
  {
    district: "Bhaktapur",
    city: "Tathali",
    zipcode: "44805",
  },
  {
    district: "Bhaktapur",
    city: "Jorpati",
    zipcode: "44806",
  },
  {
    district: "Bhaktapur",
    city: "Gamcha",
    zipcode: "44809",
  },
  {
    district: "Bhaktapur",
    city: "Dibyashwori",
    zipcode: "44810",
  },
  {
    district: "Bhaktapur",
    city: "Thimi",
    zipcode: "44811",
  },
  {
    district: "Bhaktapur",
    city: "Nagarkot",
    zipcode: "44812",
  },
  {
    district: "Bhojpur",
    city: "Bhojpur",
    zipcode: "57000",
  },
  {
    district: "Bhojpur",
    city: "Kulung Agrakhe",
    zipcode: "57001",
  },
  {
    district: "Bhojpur",
    city: "Dingla",
    zipcode: "57002",
  },
  {
    district: "Bhojpur",
    city: "Deurali",
    zipcode: "57003",
  },
  {
    district: "Bhojpur",
    city: "Pyauli",
    zipcode: "57004",
  },
  {
    district: "Bhojpur",
    city: "Yaku",
    zipcode: "57005",
  },
  {
    district: "Bhojpur",
    city: "Bastim",
    zipcode: "57006",
  },
  {
    district: "Bhojpur",
    city: "Timma",
    zipcode: "57008",
  },
  {
    district: "Bhojpur",
    city: "Dilpa Annapurna",
    zipcode: "57009",
  },
  {
    district: "Bhojpur",
    city: "Bhulke",
    zipcode: "57010",
  },
  {
    district: "Bhojpur",
    city: "Baikunthe",
    zipcode: "57011",
  },
  {
    district: "Bhojpur",
    city: "Ranibas",
    zipcode: "57012",
  },
  {
    district: "Bhojpur",
    city: "Walangkha",
    zipcode: "57013",
  },
  {
    district: "Bhojpur",
    city: "Tiwari Bhanjyang",
    zipcode: "57014",
  },
  {
    district: "Bhojpur",
    city: "Dobhane",
    zipcode: "57015",
  },
  {
    district: "Chitwan",
    city: "Chitwan",
    zipcode: "44200",
  },
  {
    district: "Chitwan",
    city: "Ratnanagar",
    zipcode: "44204",
  },
  {
    district: "Chitwan",
    city: "Mugling",
    zipcode: "44206",
  },
  {
    district: "Chitwan",
    city: "Narayangadh",
    zipcode: "44207",
  },
  {
    district: "Chitwan",
    city: "Rampur",
    zipcode: "44209",
  },
  {
    district: "Chitwan",
    city: "Soshi Bazar",
    zipcode: "44212",
  },
  {
    district: "Chitwan",
    city: "Harinagar",
    zipcode: "44213",
  },
  {
    district: "Chitwan",
    city: "Madi",
    zipcode: "44214",
  },
  {
    district: "Chitwan",
    city: "Bhandara",
    zipcode: "44202",
  },
  {
    district: "Chitwan",
    city: "Khairahani",
    zipcode: "44203",
  },
  {
    district: "Chitwan",
    city: "Jutpani",
    zipcode: "44205",
  },
  {
    district: "Chitwan",
    city: "Phulbari",
    zipcode: "44208",
  },
  {
    district: "Chitwan",
    city: "Meghauli",
    zipcode: "44210",
  },
  {
    district: "Chitwan",
    city: "Patihani",
    zipcode: "44211",
  },
  {
    district: "Dadeldhura",
    city: "Dadeldhura",
    zipcode: "10300",
  },
  {
    district: "Dadeldhura",
    city: "Ugratara",
    zipcode: "10302",
  },
  {
    district: "Dadeldhura",
    city: "Dandaban",
    zipcode: "10303",
  },
  {
    district: "Dadeldhura",
    city: "Ganeshpur",
    zipcode: "10304",
  },
  {
    district: "Dadeldhura",
    city: "Gaira Ganesh",
    zipcode: "10305",
  },
  {
    district: "Dadeldhura",
    city: "Jogbudha",
    zipcode: "10306",
  },
  {
    district: "Dadeldhura",
    city: "Lamikande",
    zipcode: "10307",
  },
  {
    district: "Dadeldhura",
    city: "Chipur",
    zipcode: "10308",
  },
  {
    district: "Dadeldhura",
    city: "Ajayameru",
    zipcode: "10309",
  },
  {
    district: "Dailekh",
    city: "Dailekh",
    zipcode: "21600",
  },
  {
    district: "Dailekh",
    city: "Gaidabaj",
    zipcode: "21602",
  },
  {
    district: "Dailekh",
    city: "Naumule",
    zipcode: "21603",
  },
  {
    district: "Dailekh",
    city: "Byastada",
    zipcode: "21604",
  },
  {
    district: "Dailekh",
    city: "Dhungeshwor",
    zipcode: "21605",
  },
  {
    district: "Dailekh",
    city: "Malika",
    zipcode: "21607",
  },
  {
    district: "Dailekh",
    city: "Dullu",
    zipcode: "21608",
  },
  {
    district: "Dailekh",
    city: "Jambu Kandha",
    zipcode: "21609",
  },
  {
    district: "Dailekh",
    city: "Rakam Karnali",
    zipcode: "21610",
  },
  {
    district: "Dang",
    city: "Dang",
    zipcode: "22400",
  },
  {
    district: "Dang",
    city: "Hapur",
    zipcode: "22402",
  },
  {
    district: "Dang",
    city: "Jumlepani",
    zipcode: "22403",
  },
  {
    district: "Dang",
    city: "Bhaluwang",
    zipcode: "22404",
  },
  {
    district: "Dang",
    city: "Koilabas",
    zipcode: "22405",
  },
  {
    district: "Dang",
    city: "Jangrahawa",
    zipcode: "22406",
  },
  {
    district: "Dang",
    city: "Rampur",
    zipcode: "22407",
  },
  {
    district: "Dang",
    city: "Urahari",
    zipcode: "22408",
  },
  {
    district: "Dang",
    city: "Hekuli",
    zipcode: "22409",
  },
  {
    district: "Dang",
    city: "Panchakule",
    zipcode: "22410",
  },
  {
    district: "Dang",
    city: "Shantinagar",
    zipcode: "22411",
  },
  {
    district: "Dang",
    city: "Tulsipur",
    zipcode: "22412",
  },
  {
    district: "Dang",
    city: "Manpur",
    zipcode: "22413",
  },
  {
    district: "Dang",
    city: "Lamahi",
    zipcode: "22414",
  },
  {
    district: "Dang",
    city: "Ghoraha",
    zipcode: "22415",
  },
  {
    district: "Darchula",
    city: "Darchula",
    zipcode: "10100",
  },
  {
    district: "Darchula",
    city: "Rapla",
    zipcode: "10101",
  },
  {
    district: "Darchula",
    city: "Duhuti",
    zipcode: "10102",
  },
  {
    district: "Darchula",
    city: "Malikarjun",
    zipcode: "10104",
  },
  {
    district: "Darchula",
    city: "Joljibi",
    zipcode: "10105",
  },
  {
    district: "Darchula",
    city: "Dandakot",
    zipcode: "10106",
  },
  {
    district: "Darchula",
    city: "Ritha Chaupata",
    zipcode: "10107",
  },
  {
    district: "Darchula",
    city: "Gokule",
    zipcode: "10108",
  },
  {
    district: "Darchula",
    city: "Sitola",
    zipcode: "10109",
  },
  {
    district: "Darchula",
    city: "Marmalatinath",
    zipcode: "10110",
  },
  {
    district: "Darchula",
    city: "Sipti",
    zipcode: "10111",
  },
  {
    district: "Dhading",
    city: "Dhading",
    zipcode: "45100",
  },
  {
    district: "Dhading",
    city: "Lapa",
    zipcode: "45101",
  },
  {
    district: "Dhading",
    city: "Sertung",
    zipcode: "45102",
  },
  {
    district: "Dhading",
    city: "Phulkharka",
    zipcode: "45103",
  },
  {
    district: "Dhading",
    city: "Tripureshwor",
    zipcode: "45104",
  },
  {
    district: "Dhading",
    city: "Katunje",
    zipcode: "45105",
  },
  {
    district: "Dhading",
    city: "Sunkhani",
    zipcode: "45106",
  },
  {
    district: "Dhading",
    city: "Sunaulabazar",
    zipcode: "45108",
  },
  {
    district: "Dhading",
    city: "Maidi",
    zipcode: "45109",
  },
  {
    district: "Dhading",
    city: "Khanikhola",
    zipcode: "45110",
  },
  {
    district: "Dhading",
    city: "Bhumisthan",
    zipcode: "45111",
  },
  {
    district: "Dhading",
    city: "Gajuri",
    zipcode: "45112",
  },
  {
    district: "Dhading",
    city: "Malekhu",
    zipcode: "45113",
  },
  {
    district: "Dhankuta",
    city: "Dhankuta",
    zipcode: "56800",
  },
  {
    district: "Dhankuta",
    city: "Mudhebash",
    zipcode: "56801",
  },
  {
    district: "Dhankuta",
    city: "Rajarani",
    zipcode: "56802",
  },
  {
    district: "Dhankuta",
    city: "Dandabazar",
    zipcode: "56803",
  },
  {
    district: "Dhankuta",
    city: "Bhedetar",
    zipcode: "56804",
  },
  {
    district: "Dhankuta",
    city: "Ankhisalla",
    zipcode: "56805",
  },
  {
    district: "Dhankuta",
    city: "Hile",
    zipcode: "56806",
  },
  {
    district: "Dhankuta",
    city: "Muga",
    zipcode: "56807",
  },
  {
    district: "Dhankuta",
    city: "Teliya",
    zipcode: "56808",
  },
  {
    district: "Dhankuta",
    city: "Pakhribash",
    zipcode: "56809",
  },
  {
    district: "Dhankuta",
    city: "Leguwa",
    zipcode: "56810",
  },
  {
    district: "Dhankuta",
    city: "Mare Katahare",
    zipcode: "56811",
  },
  {
    district: "Dhankuta",
    city: "Arknaule",
    zipcode: "56812",
  },
  {
    district: "Dhankuta",
    city: "Chungmang",
    zipcode: "56813",
  },
  {
    district: "Dhanusha",
    city: "Dhanusha",
    zipcode: "45600",
  },
  {
    district: "Dhanusha",
    city: "Khajuri",
    zipcode: "45601",
  },
  {
    district: "Dhanusha",
    city: "Tinkoriya",
    zipcode: "45602",
  },
  {
    district: "Dhanusha",
    city: "Yadukuha",
    zipcode: "45603",
  },
  {
    district: "Dhanusha",
    city: "Duhabi",
    zipcode: "45604",
  },
  {
    district: "Dhanusha",
    city: "Chakkar",
    zipcode: "45605",
  },
  {
    district: "Dhanusha",
    city: "Raghunathpur",
    zipcode: "45606",
  },
  {
    district: "Dhanusha",
    city: "Godar Chisapani",
    zipcode: "45607",
  },
  {
    district: "Dhanusha",
    city: "Dhanushadham",
    zipcode: "45608",
  },
  {
    district: "Dhanusha",
    city: "Bagachauda",
    zipcode: "45610",
  },
  {
    district: "Dhanusha",
    city: "Jatahi",
    zipcode: "45611",
  },
  {
    district: "Dhanusha",
    city: "Phulgama",
    zipcode: "45612",
  },
  {
    district: "Dhanusha",
    city: "Sankhuwa Mahendranagar",
    zipcode: "45616",
  },
  {
    district: "Dhanusha",
    city: "Dhalkebar",
    zipcode: "45617",
  },
  {
    district: "Dolakha",
    city: "Dolakha",
    zipcode: "45500",
  },
  {
    district: "Dolakha",
    city: "Khahare",
    zipcode: "45501",
  },
  {
    district: "Dolakha",
    city: "Namdu",
    zipcode: "45502",
  },
  {
    district: "Dolakha",
    city: "Jiri",
    zipcode: "45503",
  },
  {
    district: "Dolakha",
    city: "Japhekalapani",
    zipcode: "45505",
  },
  {
    district: "Dolakha",
    city: "Melung",
    zipcode: "45506",
  },
  {
    district: "Dolakha",
    city: "Bhusapheda",
    zipcode: "45507",
  },
  {
    district: "Dolakha",
    city: "Sunkhani",
    zipcode: "45509",
  },
  {
    district: "Dolakha",
    city: "Khopachangu",
    zipcode: "45510",
  },
  {
    district: "Dolakha",
    city: "Lamabagar",
    zipcode: "45511",
  },
  {
    district: "Dolakha",
    city: "Chitre",
    zipcode: "45512",
  },
  {
    district: "Dolpa",
    city: "Dolpa",
    zipcode: "21400",
  },
  {
    district: "Dolpa",
    city: "Juphal",
    zipcode: "21401",
  },
  {
    district: "Dolpa",
    city: "Tripurakot",
    zipcode: "21402",
  },
  {
    district: "Dolpa",
    city: "Liku",
    zipcode: "21403",
  },
  {
    district: "Dolpa",
    city: "Sarmi",
    zipcode: "21404",
  },
  {
    district: "Dolpa",
    city: "Kaigaun",
    zipcode: "21405",
  },
  {
    district: "Dolpa",
    city: "Foksundo",
    zipcode: "21406",
  },
  {
    district: "Dolpa",
    city: "Namdo",
    zipcode: "21407",
  },
  {
    district: "Doti",
    city: "Doti",
    zipcode: "10800",
  },
  {
    district: "Doti",
    city: "Silgadhi",
    zipcode: "10801",
  },
  {
    district: "Doti",
    city: "Sanagaun",
    zipcode: "10802",
  },
  {
    district: "Doti",
    city: "Daund",
    zipcode: "10803",
  },
  {
    district: "Doti",
    city: "Mauwa Nagardaha",
    zipcode: "10804",
  },
  {
    district: "Doti",
    city: "Banedungrasen",
    zipcode: "10805",
  },
  {
    district: "Doti",
    city: "Jorayal",
    zipcode: "10806",
  },
  {
    district: "Doti",
    city: "Gadhshera",
    zipcode: "10807",
  },
  {
    district: "Doti",
    city: "Lanakedareswor",
    zipcode: "10808",
  },
  {
    district: "Doti",
    city: "Boktan",
    zipcode: "10809",
  },
  {
    district: "Doti",
    city: "Byal",
    zipcode: "10810",
  },
  {
    district: "Doti",
    city: "Mudbhara",
    zipcode: "10811",
  },
  {
    district: "Gorkha",
    city: "Gorkha",
    zipcode: "34000",
  },
  {
    district: "Gorkha",
    city: "Bungkot",
    zipcode: "34002",
  },
  {
    district: "Gorkha",
    city: "Manakamana",
    zipcode: "34003",
  },
  {
    district: "Gorkha",
    city: "Batase",
    zipcode: "34004",
  },
  {
    district: "Gorkha",
    city: "Luintel",
    zipcode: "34005",
  },
  {
    district: "Gorkha",
    city: "Anapipal",
    zipcode: "34006",
  },
  {
    district: "Gorkha",
    city: "Jaubari",
    zipcode: "34007",
  },
  {
    district: "Gorkha",
    city: "Bhachchek",
    zipcode: "34008",
  },
  {
    district: "Gorkha",
    city: "Saurpani",
    zipcode: "34009",
  },
  {
    district: "Gorkha",
    city: "Ghyampesal",
    zipcode: "34010",
  },
  {
    district: "Gorkha",
    city: "Aarughat",
    zipcode: "34011",
  },
  {
    district: "Gorkha",
    city: "Gumda",
    zipcode: "34012",
  },
  {
    district: "Gorkha",
    city: "Sirdibash",
    zipcode: "34013",
  },
  {
    district: "Gulmi",
    city: "Gulmi",
    zipcode: "32600",
  },
  {
    district: "Gulmi",
    city: "Purtighat",
    zipcode: "32601",
  },
  {
    district: "Gulmi",
    city: "Bharse",
    zipcode: "32602",
  },
  {
    district: "Gulmi",
    city: "Chandrakot",
    zipcode: "32603",
  },
  {
    district: "Gulmi",
    city: "Majuwa",
    zipcode: "32604",
  },
  {
    district: "Gulmi",
    city: "Ridi",
    zipcode: "32605",
  },
  {
    district: "Gulmi",
    city: "Sringa",
    zipcode: "32606",
  },
  {
    district: "Gulmi",
    city: "Birabas",
    zipcode: "32607",
  },
  {
    district: "Gulmi",
    city: "Wami",
    zipcode: "32609",
  },
  {
    district: "Gulmi",
    city: "Ismadohali",
    zipcode: "32610",
  },
  {
    district: "Gulmi",
    city: "Dhurkot",
    zipcode: "32611",
  },
  {
    district: "Gulmi",
    city: "Purkotadha",
    zipcode: "32612",
  },
  {
    district: "Gulmi",
    city: "Arje",
    zipcode: "32613",
  },
  {
    district: "Gulmi",
    city: "Manabhak",
    zipcode: "32614",
  },
  {
    district: "Gulmi",
    city: "Pipaldanda",
    zipcode: "32615",
  },
  {
    district: "Humla",
    city: "Humla",
    zipcode: "21000",
  },
  {
    district: "Humla",
    city: "Muchu",
    zipcode: "21003",
  },
  {
    district: "Humla",
    city: "Lali",
    zipcode: "21004",
  },
  {
    district: "Humla",
    city: "Sarkegadh",
    zipcode: "21005",
  },
  {
    district: "Humla",
    city: "Darma",
    zipcode: "21007",
  },
  {
    district: "Humla",
    city: "Srinagar",
    zipcode: "21008",
  },
  {
    district: "Ilam",
    city: "Ilam",
    zipcode: "57300",
  },
  {
    district: "Ilam",
    city: "Nayabazar",
    zipcode: "57302",
  },
  {
    district: "Ilam",
    city: "Pashupatinagar",
    zipcode: "57303",
  },
  {
    district: "Ilam",
    city: "Aaitabare",
    zipcode: "57304",
  },
  {
    district: "Ilam",
    city: "Harkatebazar",
    zipcode: "57305",
  },
  {
    district: "Ilam",
    city: "Gajurmukhi",
    zipcode: "57306",
  },
  {
    district: "Ilam",
    city: "Mangal Bare",
    zipcode: "57307",
  },
  {
    district: "Ilam",
    city: "Nepaltar",
    zipcode: "57308",
  },
  {
    district: "Ilam",
    city: "Jamuna",
    zipcode: "57309",
  },
  {
    district: "Ilam",
    city: "Gitpur",
    zipcode: "57310",
  },
  {
    district: "Ilam",
    city: "Cheesa Pani Panchami",
    zipcode: "57311",
  },
  {
    district: "Ilam",
    city: "Phikal",
    zipcode: "57312",
  },
  {
    district: "Jajarkot",
    city: "Jajarkot",
    zipcode: "21500",
  },
  {
    district: "Jajarkot",
    city: "Dhime",
    zipcode: "21503",
  },
  {
    district: "Jajarkot",
    city: "Dalli",
    zipcode: "21504",
  },
  {
    district: "Jajarkot",
    city: "Ragda",
    zipcode: "21505",
  },
  {
    district: "Jajarkot",
    city: "Rokaya gaun (Limsa)",
    zipcode: "21506",
  },
  {
    district: "Jajarkot",
    city: "Dashera",
    zipcode: "21508",
  },
  {
    district: "Jajarkot",
    city: "Thalaraikar",
    zipcode: "21509",
  },
  {
    district: "Jajarkot",
    city: "Garkhakot",
    zipcode: "21510",
  },
  {
    district: "Jajarkot",
    city: "Karkigaun",
    zipcode: "21511",
  },
  {
    district: "Jhapa",
    city: "Jhapa",
    zipcode: "57200",
  },
  {
    district: "Jhapa",
    city: "Baniyani",
    zipcode: "57201",
  },
  {
    district: "Jhapa",
    city: "Goldhap",
    zipcode: "57202",
  },
  {
    district: "Jhapa",
    city: "Chandragadhi",
    zipcode: "57203",
  },
  {
    district: "Jhapa",
    city: "Birtamod",
    zipcode: "57204",
  },
  {
    district: "Jhapa",
    city: "Sanishchare",
    zipcode: "57205",
  },
  {
    district: "Jhapa",
    city: "Budhabare",
    zipcode: "57206",
  },
  {
    district: "Jhapa",
    city: "Dhulabari",
    zipcode: "57207",
  },
  {
    district: "Jhapa",
    city: "Kankarbhitta",
    zipcode: "57208",
  },
  {
    district: "Jhapa",
    city: "Rajgadh",
    zipcode: "57209",
  },
  {
    district: "Jhapa",
    city: "Durgapur",
    zipcode: "57210",
  },
  {
    district: "Jhapa",
    city: "Jhapa",
    zipcode: "57211",
  },
  {
    district: "Jhapa",
    city: "Dudhe",
    zipcode: "57212",
  },
  {
    district: "Jhapa",
    city: "Shivagunj",
    zipcode: "57213",
  },
  {
    district: "Jhapa",
    city: "Topagachhi",
    zipcode: "57214",
  },
  {
    district: "Jhapa",
    city: "Gaurigunj",
    zipcode: "57215",
  },
  {
    district: "Jhapa",
    city: "Gauradaha",
    zipcode: "57216",
  },
  {
    district: "Jhapa",
    city: "Damak",
    zipcode: "57217",
  },
  {
    district: "Jumla",
    city: "Jumla",
    zipcode: "21200",
  },
  {
    district: "Jumla",
    city: "Dillichaur",
    zipcode: "21202",
  },
  {
    district: "Jumla",
    city: "Tatopani",
    zipcode: "21204",
  },
  {
    district: "Jumla",
    city: "Malikathata",
    zipcode: "21205",
  },
  {
    district: "Jumla",
    city: "Kalikakhetu",
    zipcode: "21206",
  },
  {
    district: "Jumla",
    city: "Narakot",
    zipcode: "21207",
  },
  {
    district: "Jumla",
    city: "Hatsinja",
    zipcode: "21208",
  },
  {
    district: "Jumla",
    city: "Chautha",
    zipcode: "21209",
  },
  {
    district: "Kailali",
    city: "Munuwa",
    zipcode: "10902",
  },
  {
    district: "Kailali",
    city: "Kailali",
    zipcode: "10900",
  },
  {
    district: "Kailali",
    city: "Tikapur",
    zipcode: "10901",
  },
  {
    district: "Kailali",
    city: "Dododhara",
    zipcode: "10903",
  },
  {
    district: "Kailali",
    city: "Lamki",
    zipcode: "10904",
  },
  {
    district: "Kailali",
    city: "Masuriya",
    zipcode: "10905",
  },
  {
    district: "Kailali",
    city: "Pahalmanpur",
    zipcode: "10906",
  },
  {
    district: "Kailali",
    city: "Hasuliya",
    zipcode: "10907",
  },
  {
    district: "Kailali",
    city: "Bhajani",
    zipcode: "10908",
  },
  {
    district: "Kailali",
    city: "Joshipur",
    zipcode: "10909",
  },
  {
    district: "Kailali",
    city: "Phulbari",
    zipcode: "10910",
  },
  {
    district: "Kailali",
    city: "Atariya",
    zipcode: "10911",
  },
  {
    district: "Kailali",
    city: "Chaumala",
    zipcode: "10912",
  },
  {
    district: "Kailali",
    city: "Phaltude",
    zipcode: "10914",
  },
  {
    district: "Kalikot",
    city: "Kalikot",
    zipcode: "21300",
  },
  {
    district: "Kalikot",
    city: "Sanniraskot",
    zipcode: "21303",
  },
  {
    district: "Kalikot",
    city: "Mehalmudi",
    zipcode: "21304",
  },
  {
    district: "Kalikot",
    city: "Kotbada",
    zipcode: "21305",
  },
  {
    district: "Kalikot",
    city: "Kalikot",
    zipcode: "21306",
  },
  {
    district: "Kalikot",
    city: "Padamghat",
    zipcode: "21307",
  },
  {
    district: "Kalikot",
    city: "Jubitha",
    zipcode: "21308",
  },
  {
    district: "Kalikot",
    city: "Thirpu",
    zipcode: "21309",
  },
  {
    district: "Kanchanpur",
    city: "Kanchanpur",
    zipcode: "10400",
  },
  {
    district: "Kanchanpur",
    city: "Krishnapur",
    zipcode: "10401",
  },
  {
    district: "Kanchanpur",
    city: "Kalika",
    zipcode: "10402",
  },
  {
    district: "Kanchanpur",
    city: "Punarbas",
    zipcode: "10403",
  },
  {
    district: "Kanchanpur",
    city: "Beldadi",
    zipcode: "10404",
  },
  {
    district: "Kanchanpur",
    city: "Pipaladi",
    zipcode: "10405",
  },
  {
    district: "Kanchanpur",
    city: "Kanchanpur",
    zipcode: "10406",
  },
  {
    district: "Kanchanpur",
    city: "Chandani",
    zipcode: "10407",
  },
  {
    district: "Kanchanpur",
    city: "Airport",
    zipcode: "10409",
  },
  {
    district: "Kanchanpur",
    city: "Suda",
    zipcode: "10410",
  },
  {
    district: "Kanchanpur",
    city: "Jhalari",
    zipcode: "10411",
  },
  {
    district: "Kapilvastu",
    city: "Kapilvastu",
    zipcode: "32800",
  },
  {
    district: "Kapilvastu",
    city: "Pipara",
    zipcode: "32801",
  },
  {
    district: "Kapilvastu",
    city: "Patariya",
    zipcode: "32802",
  },
  {
    district: "Kapilvastu",
    city: "Pakadi",
    zipcode: "32804",
  },
  {
    district: "Kapilvastu",
    city: "Kopawa",
    zipcode: "32805",
  },
  {
    district: "Kapilvastu",
    city: "Gotihawa",
    zipcode: "32808",
  },
  {
    district: "Kapilvastu",
    city: "Gorusinge",
    zipcode: "32809",
  },
  {
    district: "Kapilvastu",
    city: "Pattharkot",
    zipcode: "32810",
  },
  {
    district: "Kapilvastu",
    city: "Thuniya",
    zipcode: "32811",
  },
  {
    district: "Kapilvastu",
    city: "Maharajgunj",
    zipcode: "32812",
  },
  {
    district: "Kapilvastu",
    city: "Ganeshpur",
    zipcode: "32813",
  },
  {
    district: "Kapilvastu",
    city: "Chanauta",
    zipcode: "32814",
  },
  {
    district: "Kapilvastu",
    city: "Krishnanagar",
    zipcode: "32815",
  },
  {
    district: "Kapilvastu",
    city: "Shiva Raj",
    zipcode: "32816",
  },
  {
    district: "Kaski",
    city: "Kaski",
    zipcode: "33700",
  },
  {
    district: "Kaski",
    city: "Rupakot",
    zipcode: "33701",
  },
  {
    district: "Kaski",
    city: "Gagan Gaunda",
    zipcode: "33702",
  },
  {
    district: "Kaski",
    city: "Makaikhola",
    zipcode: "33703",
  },
  {
    district: "Kaski",
    city: "Majhathana",
    zipcode: "33704",
  },
  {
    district: "Kaski",
    city: "Sildujure",
    zipcode: "33705",
  },
  {
    district: "Kaski",
    city: "Nirmalpokhari",
    zipcode: "33706",
  },
  {
    district: "Kaski",
    city: "Pardibandh",
    zipcode: "33707",
  },
  {
    district: "Kaski",
    city: "Bhalam",
    zipcode: "33708",
  },
  {
    district: "Kaski",
    city: "Chapakot",
    zipcode: "33709",
  },
  {
    district: "Kaski",
    city: "Birethanti",
    zipcode: "33710",
  },
  {
    district: "Kaski",
    city: "Naudanda",
    zipcode: "33711",
  },
  {
    district: "Kaski",
    city: "Ghachok",
    zipcode: "33712",
  },
  {
    district: "Kaski",
    city: "Purunchaur",
    zipcode: "33713",
  },
  {
    district: "Kathmandu",
    city: "Kathmandu",
    zipcode: "44600",
  },
  {
    district: "Kathmandu",
    city: "Sankhu",
    zipcode: "44601",
  },
  {
    district: "Kathmandu",
    city: "Chabahil",
    zipcode: "44602",
  },
  {
    district: "Kathmandu",
    city: "Sundarijal",
    zipcode: "44603",
  },
  {
    district: "Kathmandu",
    city: "Gauchar",
    zipcode: "44604",
  },
  {
    district: "Kathmandu",
    city: "Dillibazar",
    zipcode: "44605",
  },
  {
    district: "Kathmandu",
    city: "Bansbari",
    zipcode: "44606",
  },
  {
    district: "Kathmandu",
    city: "Tokha Saraswati",
    zipcode: "44608",
  },
  {
    district: "Kathmandu",
    city: "Sachibalaya",
    zipcode: "44609",
  },
  {
    district: "Kathmandu",
    city: "Manmaiju",
    zipcode: "44610",
  },
  {
    district: "Kathmandu",
    city: "Balaju",
    zipcode: "44611",
  },
  {
    district: "Kathmandu",
    city: "Tribhuvan University",
    zipcode: "44613",
  },
  {
    district: "Kathmandu",
    city: "Kalimati",
    zipcode: "44614",
  },
  {
    district: "Kathmandu",
    city: "Pharping",
    zipcode: "44615",
  },
  {
    district: "Kathmandu",
    city: "Baluwatar",
    zipcode: "44616",
  },
  {
    district: "Kathmandu",
    city: "Sarbochcha Adalat",
    zipcode: "44617",
  },
  {
    district: "Kathmandu",
    city: "Kirtipur",
    zipcode: "44618",
  },
  {
    district: "Kathmandu",
    city: "Thankot",
    zipcode: "44619",
  },
  {
    district: "Kathmandu",
    city: "Swayambhu",
    zipcode: "44620",
  },
  {
    district: "Kathmandu",
    city: "Pashupati",
    zipcode: "44621",
  },
  {
    district: "Kathmandu",
    city: "Budhanilkantha",
    zipcode: "44622",
  },
  {
    district: "Kavrepalanchok",
    city: "Pokharinarayanshthan",
    zipcode: "45203",
  },
  {
    district: "Kavrepalanchok",
    city: "Gumati Bhanjyang",
    zipcode: "45204",
  },
  {
    district: "Kavrepalanchok",
    city: "Mahadevasthan",
    zipcode: "45213",
  },
  {
    district: "Kavrepalanchok",
    city: "Khopasi",
    zipcode: "45216",
  },
  {
    district: "Kavrepalanchok",
    city: "Kavrepalanchok",
    zipcode: "45200",
  },
  {
    district: "Kavrepalanchok",
    city: "Ghartichhap",
    zipcode: "45201",
  },
  {
    district: "Kavrepalanchok",
    city: "Mangaltar",
    zipcode: "45202",
  },
  {
    district: "Kavrepalanchok",
    city: "Dapcha",
    zipcode: "45205",
  },
  {
    district: "Kavrepalanchok",
    city: "Panauti",
    zipcode: "45209",
  },
  {
    district: "Kavrepalanchok",
    city: "Banepa",
    zipcode: "45210",
  },
  {
    district: "Kavrepalanchok",
    city: "Panchkhal",
    zipcode: "45212",
  },
  {
    district: "Kavrepalanchok",
    city: "Phalante",
    zipcode: "45214",
  },
  {
    district: "Kavrepalanchok",
    city: "Dolal Ghat",
    zipcode: "45215",
  },
  {
    district: "Khotang",
    city: "Khotang",
    zipcode: "56200",
  },
  {
    district: "Khotang",
    city: "Wakshila",
    zipcode: "56201",
  },
  {
    district: "Khotang",
    city: "Aiselukharka",
    zipcode: "56202",
  },
  {
    district: "Khotang",
    city: "Jalpa",
    zipcode: "56204",
  },
  {
    district: "Khotang",
    city: "Lamidanda",
    zipcode: "56205",
  },
  {
    district: "Khotang",
    city: "Halesi mahadevasthan",
    zipcode: "56206",
  },
  {
    district: "Khotang",
    city: "Buipa",
    zipcode: "56208",
  },
  {
    district: "Khotang",
    city: "Manebhanjyang",
    zipcode: "56209",
  },
  {
    district: "Khotang",
    city: "Sapteshworichhitapokhari",
    zipcode: "56210",
  },
  {
    district: "Khotang",
    city: "Khotang",
    zipcode: "56211",
  },
  {
    district: "Khotang",
    city: "Chisapani",
    zipcode: "56212",
  },
  {
    district: "Khotang",
    city: "Simpani",
    zipcode: "56214",
  },
  {
    district: "Lalitpur",
    city: "Lalitpur",
    zipcode: "44700",
  },
  {
    district: "Lalitpur",
    city: "Dhapakhel",
    zipcode: "44703",
  },
  {
    district: "Lalitpur",
    city: "Imadol",
    zipcode: "44705",
  },
  {
    district: "Lalitpur",
    city: "Darabartole",
    zipcode: "44707",
  },
  {
    district: "Lalitpur",
    city: "Lubhu",
    zipcode: "44708",
  },
  {
    district: "Lalitpur",
    city: "Godawari",
    zipcode: "44709",
  },
  {
    district: "Lalitpur",
    city: "Chapagaun",
    zipcode: "44710",
  },
  {
    district: "Lalitpur",
    city: "Gotikhel",
    zipcode: "44711",
  },
  {
    district: "Lalitpur",
    city: "Bhattedanda",
    zipcode: "44712",
  },
  {
    district: "Lalitpur",
    city: "Pyutar",
    zipcode: "44713",
  },
  {
    district: "Lamjung",
    city: "Lamjung",
    zipcode: "33600",
  },
  {
    district: "Lamjung",
    city: "Maling",
    zipcode: "33602",
  },
  {
    district: "Lamjung",
    city: "Sundar Bazar",
    zipcode: "33603",
  },
  {
    district: "Lamjung",
    city: "Sotipasal",
    zipcode: "33604",
  },
  {
    district: "Lamjung",
    city: "Kunchha",
    zipcode: "33605",
  },
  {
    district: "Lamjung",
    city: "Gilung",
    zipcode: "33606",
  },
  {
    district: "Lamjung",
    city: "Khudi",
    zipcode: "33607",
  },
  {
    district: "Lamjung",
    city: "Phaliyasanghu",
    zipcode: "33608",
  },
  {
    district: "Lamjung",
    city: "Bharate",
    zipcode: "33609",
  },
  {
    district: "Lamjung",
    city: "Gaunda",
    zipcode: "33610",
  },
  {
    district: "Lamjung",
    city: "Tarkughat",
    zipcode: "33611",
  },
  {
    district: "Mahottari",
    city: "Mahottari",
    zipcode: "45700",
  },
  {
    district: "Mahottari",
    city: "Bardibash",
    zipcode: "45701",
  },
  {
    district: "Mahottari",
    city: "Bhangaha",
    zipcode: "45702",
  },
  {
    district: "Mahottari",
    city: "Loharpatti",
    zipcode: "45703",
  },
  {
    district: "Mahottari",
    city: "Pipara",
    zipcode: "45704",
  },
  {
    district: "Mahottari",
    city: "Matihani",
    zipcode: "45705",
  },
  {
    district: "Mahottari",
    city: "Ramgopalpur",
    zipcode: "45707",
  },
  {
    district: "Mahottari",
    city: "Balawa",
    zipcode: "45708",
  },
  {
    district: "Mahottari",
    city: "Laxminiya",
    zipcode: "45710",
  },
  {
    district: "Mahottari",
    city: "Gaushala",
    zipcode: "45711",
  },
  {
    district: "Mahottari",
    city: "Shreepur",
    zipcode: "45712",
  },
  {
    district: "Mahottari",
    city: "Samsi",
    zipcode: "45713",
  },
  {
    district: "Mahottari",
    city: "Manara",
    zipcode: "45714",
  },
  {
    district: "Makawanpur",
    city: "Hatiya",
    zipcode: "44103",
  },
  {
    district: "Makawanpur",
    city: "Aambhanjyang",
    zipcode: "44104",
  },
  {
    district: "Makawanpur",
    city: "Manahari",
    zipcode: "44106",
  },
  {
    district: "Makawanpur",
    city: "Basamadi",
    zipcode: "44108",
  },
  {
    district: "Makawanpur",
    city: "Markhu",
    zipcode: "44113",
  },
  {
    district: "Makawanpur",
    city: "Makawanpur",
    zipcode: "44100",
  },
  {
    district: "Makawanpur",
    city: "Phaparbari",
    zipcode: "44101",
  },
  {
    district: "Makawanpur",
    city: "Ritha Chhatibwn",
    zipcode: "44102",
  },
  {
    district: "Makawanpur",
    city: "Hetauda I.A.",
    zipcode: "44107",
  },
  {
    district: "Makawanpur",
    city: "Palung",
    zipcode: "44110",
  },
  {
    district: "Makawanpur",
    city: "Bhainse",
    zipcode: "44111",
  },
  {
    district: "Makawanpur",
    city: "Bhimphedi",
    zipcode: "44112",
  },
  {
    district: "Manang",
    city: "Manang",
    zipcode: "33500",
  },
  {
    district: "Manang",
    city: "Pisang",
    zipcode: "33502",
  },
  {
    district: "Manang",
    city: "Bhakra",
    zipcode: "33503",
  },
  {
    district: "Manang",
    city: "Mathillo Manang",
    zipcode: "33504",
  },
  {
    district: "Manang",
    city: "Nar",
    zipcode: "33507",
  },
  {
    district: "Manang",
    city: "Dharapani",
    zipcode: "33509",
  },
  {
    district: "Morang",
    city: "Morang",
    zipcode: "56600",
  },
  {
    district: "Morang",
    city: "Chunimari",
    zipcode: "56601",
  },
  {
    district: "Morang",
    city: "Rangeli",
    zipcode: "56602",
  },
  {
    district: "Morang",
    city: "Sanischare",
    zipcode: "56603",
  },
  {
    district: "Morang",
    city: "Urlabari",
    zipcode: "56604",
  },
  {
    district: "Morang",
    city: "Madhumalla",
    zipcode: "56605",
  },
  {
    district: "Morang",
    city: "Bayarban",
    zipcode: "56606",
  },
  {
    district: "Morang",
    city: "Sorabhag",
    zipcode: "56607",
  },
  {
    district: "Morang",
    city: "Dadarberiya",
    zipcode: "56608",
  },
  {
    district: "Morang",
    city: "Letang",
    zipcode: "56609",
  },
  {
    district: "Morang",
    city: "Kerabari",
    zipcode: "56610",
  },
  {
    district: "Morang",
    city: "Haraincha",
    zipcode: "56611",
  },
  {
    district: "Morang",
    city: "Bhaudaha",
    zipcode: "56612",
  },
  {
    district: "Morang",
    city: "Biratnagar Bazar",
    zipcode: "56613",
  },
  {
    district: "Morang",
    city: "Rani Sikiyahi",
    zipcode: "56614",
  },
  {
    district: "Morang",
    city: "Jhorahat",
    zipcode: "56615",
  },
  {
    district: "Morang",
    city: "Banigama",
    zipcode: "56616",
  },
  {
    district: "Morang",
    city: "Bansbari",
    zipcode: "56617",
  },
  {
    district: "Mugu",
    city: "Mugu",
    zipcode: "21100",
  },
  {
    district: "Mugu",
    city: "Rowa",
    zipcode: "21102",
  },
  {
    district: "Mugu",
    city: "Pulu",
    zipcode: "21103",
  },
  {
    district: "Mugu",
    city: "Sorubarma",
    zipcode: "21105",
  },
  {
    district: "Mugu",
    city: "Rara",
    zipcode: "21106",
  },
  {
    district: "Mugu",
    city: "Sukhadhik",
    zipcode: "21107",
  },
  {
    district: "Mugu",
    city: "Gumtha",
    zipcode: "21109",
  },
  {
    district: "Mugu",
    city: "Dhainkot",
    zipcode: "21110",
  },
  {
    district: "Mustang",
    city: "Mustang",
    zipcode: "33100",
  },
  {
    district: "Mustang",
    city: "Marpha",
    zipcode: "33102",
  },
  {
    district: "Mustang",
    city: "Kagbeni",
    zipcode: "33103",
  },
  {
    district: "Mustang",
    city: "Charang",
    zipcode: "33104",
  },
  {
    district: "Mustang",
    city: "Mustang",
    zipcode: "33105",
  },
  {
    district: "Mustang",
    city: "Chhoser",
    zipcode: "33106",
  },
  {
    district: "Mustang",
    city: "Muktinath",
    zipcode: "33107",
  },
  {
    district: "Mustang",
    city: "Lete",
    zipcode: "33108",
  },
  {
    district: "Mustang",
    city: "Thak Tukuche",
    zipcode: "33109",
  },
  {
    district: "Myagdi",
    city: "Myagdi",
    zipcode: "33200",
  },
  {
    district: "Myagdi",
    city: "Xyamarukot",
    zipcode: "33202",
  },
  {
    district: "Myagdi",
    city: "Galeswor",
    zipcode: "33203",
  },
  {
    district: "Myagdi",
    city: "Rakhu Bhagawati",
    zipcode: "33204",
  },
  {
    district: "Myagdi",
    city: "Sikha",
    zipcode: "33205",
  },
  {
    district: "Myagdi",
    city: "Dana",
    zipcode: "33206",
  },
  {
    district: "Myagdi",
    city: "Babiyachaur",
    zipcode: "33207",
  },
  {
    district: "Myagdi",
    city: "Darbang",
    zipcode: "33208",
  },
  {
    district: "Myagdi",
    city: "Pakhapani",
    zipcode: "33209",
  },
  {
    district: "Myagdi",
    city: "Takam",
    zipcode: "33210",
  },
  {
    district: "Myagdi",
    city: "Lulang",
    zipcode: "33211",
  },
  {
    district: "Nawalpur",
    city: "Nawalparasi",
    zipcode: "33000",
  },
  {
    district: "Nawalpur",
    city: "Rakuwa",
    zipcode: "33001",
  },
  {
    district: "Nawalpur",
    city: "Bulingtar",
    zipcode: "33002",
  },
  {
    district: "Nawalpur",
    city: "Gaindakot",
    zipcode: "33003",
  },
  {
    district: "Nawalpur",
    city: "Dumkauli",
    zipcode: "33004",
  },
  {
    district: "Nawalpur",
    city: "Shergunj",
    zipcode: "33005",
  },
  {
    district: "Nawalpur",
    city: "Naya Belhani",
    zipcode: "33006",
  },
  {
    district: "Nawalpur",
    city: "Tribeni",
    zipcode: "33007",
  },
  {
    district: "Parasi",
    city: "Semari",
    zipcode: "33008",
  },
  {
    district: "Parasi",
    city: "Guthi persauni",
    zipcode: "33009",
  },
  {
    district: "Parasi",
    city: "Bhujahawa",
    zipcode: "33010",
  },
  {
    district: "Parasi",
    city: "Makar",
    zipcode: "33011",
  },
  {
    district: "Parasi",
    city: "Tilakpur",
    zipcode: "33012",
  },
  {
    district: "Parasi",
    city: "Maheshpur",
    zipcode: "33013",
  },
  {
    district: "Parasi",
    city: "Sunawal",
    zipcode: "33015",
  },
  {
    district: "Parasi",
    city: "Pithauli",
    zipcode: "33016",
  },
  {
    district: "Nuwakot",
    city: "Nuwakot",
    zipcode: "44900",
  },
  {
    district: "Nuwakot",
    city: "Thansingh",
    zipcode: "44902",
  },
  {
    district: "Nuwakot",
    city: "Ranipauwa",
    zipcode: "44903",
  },
  {
    district: "Nuwakot",
    city: "Taruka",
    zipcode: "44905",
  },
  {
    district: "Nuwakot",
    city: "Deurali",
    zipcode: "44906",
  },
  {
    district: "Nuwakot",
    city: "Kahule",
    zipcode: "44907",
  },
  {
    district: "Nuwakot",
    city: "Nuwakot",
    zipcode: "44908",
  },
  {
    district: "Nuwakot",
    city: "Chokade",
    zipcode: "44909",
  },
  {
    district: "Nuwakot",
    city: "Kharanitar",
    zipcode: "44910",
  },
  {
    district: "Nuwakot",
    city: "Bhadratar",
    zipcode: "44911",
  },
  {
    district: "Nuwakot",
    city: "Ramabati",
    zipcode: "44912",
  },
  {
    district: "Nuwakot",
    city: "Rautbesi",
    zipcode: "44913",
  },
  {
    district: "Nuwakot",
    city: "Pokharichapadanda",
    zipcode: "44914",
  },
  {
    district: "Nuwakot",
    city: "Devighat",
    zipcode: "44915",
  },
  {
    district: "Okhaldhunga",
    city: "Okhaldhunga",
    zipcode: "56100",
  },
  {
    district: "Okhaldhunga",
    city: "Khani Bhanjyang",
    zipcode: "56101",
  },
  {
    district: "Okhaldhunga",
    city: "Rumjatar",
    zipcode: "56102",
  },
  {
    district: "Okhaldhunga",
    city: "Rampur",
    zipcode: "56104",
  },
  {
    district: "Okhaldhunga",
    city: "Bigutar",
    zipcode: "56105",
  },
  {
    district: "Okhaldhunga",
    city: "Khiji Phalate",
    zipcode: "56106",
  },
  {
    district: "Okhaldhunga",
    city: "Gamanangtar",
    zipcode: "56107",
  },
  {
    district: "Okhaldhunga",
    city: "Ghorakhori",
    zipcode: "56108",
  },
  {
    district: "Okhaldhunga",
    city: "Chyanam",
    zipcode: "56109",
  },
  {
    district: "Okhaldhunga",
    city: "Mane Bhanjyang",
    zipcode: "56110",
  },
  {
    district: "Okhaldhunga",
    city: "Moli",
    zipcode: "56111",
  },
  {
    district: "Okhaldhunga",
    city: "Ragani",
    zipcode: "56112",
  },
  {
    district: "Palpa",
    city: "Palpa",
    zipcode: "32500",
  },
  {
    district: "Palpa",
    city: "Sahalkot",
    zipcode: "32501",
  },
  {
    district: "Palpa",
    city: "Rampur",
    zipcode: "32502",
  },
  {
    district: "Palpa",
    city: "Hungi",
    zipcode: "32503",
  },
  {
    district: "Palpa",
    city: "Jalpa",
    zipcode: "32504",
  },
  {
    district: "Palpa",
    city: "Tahu",
    zipcode: "32505",
  },
  {
    district: "Palpa",
    city: "Jhadewa",
    zipcode: "32506",
  },
  {
    district: "Palpa",
    city: "Aryabhanjyang",
    zipcode: "32507",
  },
  {
    district: "Palpa",
    city: "Madanpokhara",
    zipcode: "32508",
  },
  {
    district: "Palpa",
    city: "Khasyauli",
    zipcode: "32509",
  },
  {
    district: "Palpa",
    city: "Argali",
    zipcode: "32510",
  },
  {
    district: "Palpa",
    city: "Chhahara",
    zipcode: "32511",
  },
  {
    district: "Palpa",
    city: "Palungmainadi",
    zipcode: "32512",
  },
  {
    district: "Palpa",
    city: "Baldengadi",
    zipcode: "32513",
  },
  {
    district: "Panchthar",
    city: "Panchthar",
    zipcode: "57400",
  },
  {
    district: "Panchthar",
    city: "Chyangthapu",
    zipcode: "57401",
  },
  {
    district: "Panchthar",
    city: "Ambarpur",
    zipcode: "57402",
  },
  {
    district: "Panchthar",
    city: "Namluwa",
    zipcode: "57403",
  },
  {
    district: "Panchthar",
    city: "Yangnam",
    zipcode: "57404",
  },
  {
    district: "Panchthar",
    city: "Nawamidanda",
    zipcode: "57406",
  },
  {
    district: "Panchthar",
    city: "Mehelbote",
    zipcode: "57407",
  },
  {
    district: "Panchthar",
    city: "Yasok",
    zipcode: "57408",
  },
  {
    district: "Panchthar",
    city: "Mauwa",
    zipcode: "57409",
  },
  {
    district: "Panchthar",
    city: "Rabi",
    zipcode: "57410",
  },
  {
    district: "Panchthar",
    city: "Limba",
    zipcode: "57411",
  },
  {
    district: "Panchthar",
    city: "Medibung",
    zipcode: "57412",
  },
  {
    district: "Parbat",
    city: "Parbat",
    zipcode: "33400",
  },
  {
    district: "Parbat",
    city: "Salija",
    zipcode: "33401",
  },
  {
    district: "Parbat",
    city: "Khurkot",
    zipcode: "33402",
  },
  {
    district: "Parbat",
    city: "Deurali",
    zipcode: "33403",
  },
  {
    district: "Parbat",
    city: "Thulipokhari",
    zipcode: "33405",
  },
  {
    district: "Parbat",
    city: "Karkineta",
    zipcode: "33406",
  },
  {
    district: "Parbat",
    city: "Devisthan",
    zipcode: "33407",
  },
  {
    district: "Parbat",
    city: "Bachchha",
    zipcode: "33408",
  },
  {
    district: "Parbat",
    city: "Lankhudeurali",
    zipcode: "33409",
  },
  {
    district: "Parbat",
    city: "Hubas",
    zipcode: "33410",
  },
  {
    district: "Parbat",
    city: "Khor Pokhara",
    zipcode: "33411",
  },
  {
    district: "Parbat",
    city: "Setibeni",
    zipcode: "33412",
  },
  {
    district: "Parsa",
    city: "Parsa",
    zipcode: "44300",
  },
  {
    district: "Parsa",
    city: "Aadarshanagar",
    zipcode: "44301",
  },
  {
    district: "Parsa",
    city: "Parbanipur",
    zipcode: "44303",
  },
  {
    district: "Parsa",
    city: "Bindabasini",
    zipcode: "44304",
  },
  {
    district: "Parsa",
    city: "Bahuari Pidari",
    zipcode: "44305",
  },
  {
    district: "Parsa",
    city: "Shirsiya Khalwatola",
    zipcode: "44306",
  },
  {
    district: "Parsa",
    city: "Biruwaguthi",
    zipcode: "44307",
  },
  {
    district: "Parsa",
    city: "Pakahamainpur",
    zipcode: "44308",
  },
  {
    district: "Parsa",
    city: "Phokhariya",
    zipcode: "44309",
  },
  {
    district: "Parsa",
    city: "Ranigunj",
    zipcode: "44310",
  },
  {
    district: "Parsa",
    city: "Paterwa Sugauli",
    zipcode: "44311",
  },
  {
    district: "Parsa",
    city: "Viswa",
    zipcode: "44312",
  },
  {
    district: "Parsa",
    city: "Janakitol",
    zipcode: "44313",
  },
  {
    district: "Parsa",
    city: "Jeetpur",
    zipcode: "44314",
  },
  {
    district: "Parsa",
    city: "Thori",
    zipcode: "44315",
  },
  {
    district: "Pyuthan",
    city: "Pyuthan",
    zipcode: "22300",
  },
  {
    district: "Pyuthan",
    city: "Dakhaquadi",
    zipcode: "22301",
  },
  {
    district: "Pyuthan",
    city: "Bhingri",
    zipcode: "22303",
  },
  {
    district: "Pyuthan",
    city: "Wangesal",
    zipcode: "22304",
  },
  {
    district: "Pyuthan",
    city: "Baraula",
    zipcode: "22305",
  },
  {
    district: "Pyuthan",
    city: "Majuwa",
    zipcode: "22307",
  },
  {
    district: "Pyuthan",
    city: "Machchhi",
    zipcode: "22308",
  },
  {
    district: "Pyuthan",
    city: "Thulabesi",
    zipcode: "22309",
  },
  {
    district: "Pyuthan",
    city: "Lungbahane",
    zipcode: "22310",
  },
  {
    district: "Pyuthan",
    city: "Bijuwar",
    zipcode: "22311",
  },
  {
    district: "Pyuthan",
    city: "Naya Gaun",
    zipcode: "22312",
  },
  {
    district: "Ramechhap",
    city: "Ramechhap",
    zipcode: "45400",
  },
  {
    district: "Ramechhap",
    city: "Those",
    zipcode: "45401",
  },
  {
    district: "Ramechhap",
    city: "Duragaun",
    zipcode: "45402",
  },
  {
    district: "Ramechhap",
    city: "Betali",
    zipcode: "45403",
  },
  {
    district: "Ramechhap",
    city: "Khimti",
    zipcode: "45404",
  },
  {
    district: "Ramechhap",
    city: "Saghutar",
    zipcode: "45405",
  },
  {
    district: "Ramechhap",
    city: "Kathjor",
    zipcode: "45406",
  },
  {
    district: "Ramechhap",
    city: "Puranagaun",
    zipcode: "45408",
  },
  {
    district: "Ramechhap",
    city: "Doramba",
    zipcode: "45409",
  },
  {
    district: "Ramechhap",
    city: "Hiledevi",
    zipcode: "45410",
  },
  {
    district: "Ramechhap",
    city: "Bhirpani",
    zipcode: "45411",
  },
  {
    district: "Rasuwa",
    city: "Rasuwa",
    zipcode: "45000",
  },
  {
    district: "Rasuwa",
    city: "Dhaibung",
    zipcode: "45003",
  },
  {
    district: "Rasuwa",
    city: "Ramkali",
    zipcode: "45004",
  },
  {
    district: "Rasuwa",
    city: "Rasuwa",
    zipcode: "45007",
  },
  {
    district: "Rasuwa",
    city: "Syaphru Besi",
    zipcode: "45009",
  },
  {
    district: "Rautahat",
    city: "Rautahat",
    zipcode: "44500",
  },
  {
    district: "Rautahat",
    city: "Saruatha",
    zipcode: "44502",
  },
  {
    district: "Rautahat",
    city: "Pipra bazar",
    zipcode: "44503",
  },
  {
    district: "Rautahat",
    city: "Madhopur",
    zipcode: "44504",
  },
  {
    district: "Rautahat",
    city: "Rajpurpharahadawa",
    zipcode: "44506",
  },
  {
    district: "Rautahat",
    city: "Patharabudhram",
    zipcode: "44508",
  },
  {
    district: "Rautahat",
    city: "Sitalpur",
    zipcode: "44509",
  },
  {
    district: "Rautahat",
    city: "Shivanagar",
    zipcode: "44510",
  },
  {
    district: "Rautahat",
    city: "Laxminiya",
    zipcode: "44511",
  },
  {
    district: "Rautahat",
    city: "Katahariya",
    zipcode: "44512",
  },
  {
    district: "Rautahat",
    city: "Samanpur",
    zipcode: "44513",
  },
  {
    district: "Rautahat",
    city: "Chandra Nigahapur",
    zipcode: "44515",
  },
  {
    district: "Rolpa",
    city: "Rolpa",
    zipcode: "22100",
  },
  {
    district: "Rolpa",
    city: "Khungri",
    zipcode: "22102",
  },
  {
    district: "Rolpa",
    city: "Sirpa",
    zipcode: "22103",
  },
  {
    district: "Rolpa",
    city: "Thawang",
    zipcode: "22106",
  },
  {
    district: "Rolpa",
    city: "Himtakura",
    zipcode: "22107",
  },
  {
    district: "Rolpa",
    city: "Ghartigaun",
    zipcode: "22108",
  },
  {
    district: "Rolpa",
    city: "Nerpa",
    zipcode: "22110",
  },
  {
    district: "Rolpa",
    city: "Dahaban",
    zipcode: "22111",
  },
  {
    district: "Rolpa",
    city: "Shulichaur",
    zipcode: "22112",
  },
  {
    district: "Rolpa",
    city: "Jhenam (Holeri)",
    zipcode: "22113",
  },
  {
    district: "Western Rukum",
    city: "Rukum",
    zipcode: "22000",
  },
  {
    district: "Eastern Rukum",
    city: "Rukumkot",
    zipcode: "22002",
  },
  {
    district: "Western Rukum",
    city: "Riwangchaur",
    zipcode: "22004",
  },
  {
    district: "Eastern Rukum",
    city: "Kol",
    zipcode: "22005",
  },
  {
    district: "Western Rukum",
    city: "Peugha",
    zipcode: "22007",
  },
  {
    district: "Western Rukum",
    city: "Chaurjahari",
    zipcode: "22008",
  },
  {
    district: "Western Rukum",
    city: "Simli",
    zipcode: "22009",
  },
  {
    district: "Western Rukum",
    city: "Western Radijyula",
    zipcode: "22010",
  },
  {
    district: "Western Rukum",
    city: "Baphikot",
    zipcode: "22011",
  },
  {
    district: "Rupandehi",
    city: "Rupandehi",
    zipcode: "32900",
  },
  {
    district: "Rupandehi",
    city: "Siktahan",
    zipcode: "32901",
  },
  {
    district: "Rupandehi",
    city: "Dhakadhai",
    zipcode: "32902",
  },
  {
    district: "Rupandehi",
    city: "Manigram",
    zipcode: "32903",
  },
  {
    district: "Rupandehi",
    city: "Kotihawa",
    zipcode: "32904",
  },
  {
    district: "Rupandehi",
    city: "Thutipipal",
    zipcode: "32905",
  },
  {
    district: "Rupandehi",
    city: "Butwal",
    zipcode: "32907",
  },
  {
    district: "Rupandehi",
    city: "Parroha",
    zipcode: "32908",
  },
  {
    district: "Rupandehi",
    city: "Sauraha Pharsa",
    zipcode: "32909",
  },
  {
    district: "Rupandehi",
    city: "Amuwa",
    zipcode: "32910",
  },
  {
    district: "Rupandehi",
    city: "Saljhandi",
    zipcode: "32911",
  },
  {
    district: "Rupandehi",
    city: "Suryapura",
    zipcode: "32912",
  },
  {
    district: "Rupandehi",
    city: "Tenuhawa",
    zipcode: "32913",
  },
  {
    district: "Rupandehi",
    city: "Lumbini",
    zipcode: "32914",
  },
  {
    district: "Rupandehi",
    city: "Betkuiya",
    zipcode: "32915",
  },
  {
    district: "Rupandehi",
    city: "Mahadehiya",
    zipcode: "32916",
  },
  {
    district: "Salyan",
    city: "Salyan",
    zipcode: "22200",
  },
  {
    district: "Salyan",
    city: "Kalimati Kalche",
    zipcode: "22201",
  },
  {
    district: "Salyan",
    city: "Luham",
    zipcode: "22202",
  },
  {
    district: "Salyan",
    city: "Dhanbang",
    zipcode: "22203",
  },
  {
    district: "Salyan",
    city: "Mahaneta",
    zipcode: "22204",
  },
  {
    district: "Salyan",
    city: "Malneta",
    zipcode: "22207",
  },
  {
    district: "Salyan",
    city: "Maidu",
    zipcode: "22208",
  },
  {
    district: "Salyan",
    city: "Ragechour",
    zipcode: "22209",
  },
  {
    district: "Salyan",
    city: "Bhalchaur",
    zipcode: "22210",
  },
  {
    district: "Salyan",
    city: "Tharmare",
    zipcode: "22211",
  },
  {
    district: "Sankhuwasabha",
    city: "Sankhuwasabha",
    zipcode: "56900",
  },
  {
    district: "Sankhuwasabha",
    city: "Hatiya",
    zipcode: "56901",
  },
  {
    district: "Sankhuwasabha",
    city: "Hedangana",
    zipcode: "56902",
  },
  {
    district: "Sankhuwasabha",
    city: "Tamku",
    zipcode: "56903",
  },
  {
    district: "Sankhuwasabha",
    city: "Chandanpur",
    zipcode: "56904",
  },
  {
    district: "Sankhuwasabha",
    city: "Bahrabishe",
    zipcode: "56905",
  },
  {
    district: "Sankhuwasabha",
    city: "Tumlingtar",
    zipcode: "56906",
  },
  {
    district: "Sankhuwasabha",
    city: "Wana",
    zipcode: "56907",
  },
  {
    district: "Sankhuwasabha",
    city: "Shidhakali",
    zipcode: "56908",
  },
  {
    district: "Sankhuwasabha",
    city: "Madi",
    zipcode: "56909",
  },
  {
    district: "Sankhuwasabha",
    city: "Ankhibhui",
    zipcode: "56910",
  },
  {
    district: "Sankhuwasabha",
    city: "Mamling",
    zipcode: "56911",
  },
  {
    district: "Sankhuwasabha",
    city: "Manebhanjyang",
    zipcode: "56912",
  },
  {
    district: "Sankhuwasabha",
    city: "Chainpur",
    zipcode: "56913",
  },
  {
    district: "Saptari",
    city: "Saptari",
    zipcode: "56400",
  },
  {
    district: "Saptari",
    city: "Hanuman Nagar",
    zipcode: "56401",
  },
  {
    district: "Saptari",
    city: "Bairaba",
    zipcode: "56402",
  },
  {
    district: "Saptari",
    city: "Phattepur",
    zipcode: "56403",
  },
  {
    district: "Saptari",
    city: "Kanchanpur",
    zipcode: "56404",
  },
  {
    district: "Saptari",
    city: "Praswani",
    zipcode: "56405",
  },
  {
    district: "Saptari",
    city: "Bhagawatpur",
    zipcode: "56406",
  },
  {
    district: "Saptari",
    city: "Koiladi",
    zipcode: "56407",
  },
  {
    district: "Saptari",
    city: "Chhinnamasta",
    zipcode: "56408",
  },
  {
    district: "Saptari",
    city: "Bishnupur",
    zipcode: "56409",
  },
  {
    district: "Saptari",
    city: "Rupani",
    zipcode: "56411",
  },
  {
    district: "Saptari",
    city: "Pato",
    zipcode: "56412",
  },
  {
    district: "Saptari",
    city: "Arnaha",
    zipcode: "56413",
  },
  {
    district: "Saptari",
    city: "Kalyanpur",
    zipcode: "56414",
  },
  {
    district: "Saptari",
    city: "Bodebarsain",
    zipcode: "56415",
  },
  {
    district: "Saptari",
    city: "Sisawa",
    zipcode: "56416",
  },
  {
    district: "Saptari",
    city: "Kadarwona",
    zipcode: "56417",
  },
  {
    district: "Saptari",
    city: "Bhardaha",
    zipcode: "56418",
  },
  {
    district: "Sarlahi",
    city: "Sarlahi",
    zipcode: "45800",
  },
  {
    district: "Sarlahi",
    city: "Lalbandi",
    zipcode: "45801",
  },
  {
    district: "Sarlahi",
    city: "Bayalbas",
    zipcode: "45802",
  },
  {
    district: "Sarlahi",
    city: "Haripurwa",
    zipcode: "45803",
  },
  {
    district: "Sarlahi",
    city: "Hariaun",
    zipcode: "45804",
  },
  {
    district: "Sarlahi",
    city: "Haripur",
    zipcode: "45805",
  },
  {
    district: "Sarlahi",
    city: "Brahmapuri",
    zipcode: "45806",
  },
  {
    district: "Sarlahi",
    city: "Kaudena",
    zipcode: "45809",
  },
  {
    district: "Sarlahi",
    city: "Barahathawa",
    zipcode: "45810",
  },
  {
    district: "Sarlahi",
    city: "Sundarpur",
    zipcode: "45811",
  },
  {
    district: "Sarlahi",
    city: "Dumariya",
    zipcode: "45813",
  },
  {
    district: "Sarlahi",
    city: "Karmaiya",
    zipcode: "45814",
  },
  {
    district: "Sarlahi",
    city: "Harkathawa",
    zipcode: "45815",
  },
  {
    district: "Sarlahi",
    city: "Ramnagar(Bahuarwa)",
    zipcode: "45816",
  },
  {
    district: "Sarlahi",
    city: "Chhatauna",
    zipcode: "45817",
  },
  {
    district: "Sindhuli",
    city: "Sindhuli",
    zipcode: "45900",
  },
  {
    district: "Sindhuli",
    city: "Solpa",
    zipcode: "45901",
  },
  {
    district: "Sindhuli",
    city: "Bahun Tilpung",
    zipcode: "45902",
  },
  {
    district: "Sindhuli",
    city: "Dudhauli",
    zipcode: "45903",
  },
  {
    district: "Sindhuli",
    city: "Dakaha",
    zipcode: "45904",
  },
  {
    district: "Sindhuli",
    city: "Gwaltar",
    zipcode: "45905",
  },
  {
    district: "Sindhuli",
    city: "Khurkot",
    zipcode: "45906",
  },
  {
    district: "Sindhuli",
    city: "Belghari",
    zipcode: "45907",
  },
  {
    district: "Sindhuli",
    city: "Bhiman",
    zipcode: "45909",
  },
  {
    district: "Sindhuli",
    city: "Jhanga Jholi",
    zipcode: "45910",
  },
  {
    district: "Sindhuli",
    city: "Netrakali",
    zipcode: "45911",
  },
  {
    district: "Sindhuli",
    city: "Kapilakot",
    zipcode: "45912",
  },
  {
    district: "Sindhuli",
    city: "Pipalmadhiratanpur           ",
    zipcode: "45913",
  },
  {
    district: "Sindhupalchok",
    city: "Sindhupalchok",
    zipcode: "45300",
  },
  {
    district: "Sindhupalchok",
    city: "Kodari",
    zipcode: "45301",
  },
  {
    district: "Sindhupalchok",
    city: "Barabise",
    zipcode: "45302",
  },
  {
    district: "Sindhupalchok",
    city: "Atarpur",
    zipcode: "45304",
  },
  {
    district: "Sindhupalchok",
    city: "Lamosanghu",
    zipcode: "45305",
  },
  {
    district: "Sindhupalchok",
    city: "Nawalpur",
    zipcode: "45306",
  },
  {
    district: "Sindhupalchok",
    city: "Pangtang",
    zipcode: "45307",
  },
  {
    district: "Sindhupalchok",
    city: "Jalbire",
    zipcode: "45308",
  },
  {
    district: "Sindhupalchok",
    city: "Bhotsipa",
    zipcode: "45309",
  },
  {
    district: "Sindhupalchok",
    city: "Melamchi Bahunepati",
    zipcode: "45310",
  },
  {
    district: "Sindhupalchok",
    city: "Gyalthum",
    zipcode: "45311",
  },
  {
    district: "Sindhupalchok",
    city: "Thangapaldhap",
    zipcode: "45312",
  },
  {
    district: "Sindhupalchok",
    city: "Dubachaur",
    zipcode: "45313",
  },
  {
    district: "Sindhupalchok",
    city: "Balephi",
    zipcode: "45314",
  },
  {
    district: "Siraha",
    city: "Siraha",
    zipcode: "56500",
  },
  {
    district: "Siraha",
    city: "Bastipur",
    zipcode: "56501",
  },
  {
    district: "Siraha",
    city: "Lahan",
    zipcode: "56502",
  },
  {
    district: "Siraha",
    city: "Bhagawanpur",
    zipcode: "56503",
  },
  {
    district: "Siraha",
    city: "Dhanagadhi",
    zipcode: "56504",
  },
  {
    district: "Siraha",
    city: "Maheshpur patari",
    zipcode: "56505",
  },
  {
    district: "Siraha",
    city: "Bariyarpatti",
    zipcode: "56506",
  },
  {
    district: "Siraha",
    city: "Golbazar (Asanpur)",
    zipcode: "56508",
  },
  {
    district: "Siraha",
    city: "Sukhipur",
    zipcode: "56509",
  },
  {
    district: "Siraha",
    city: "Bishnupur",
    zipcode: "56511",
  },
  {
    district: "Siraha",
    city: "Belha",
    zipcode: "56512",
  },
  {
    district: "Siraha",
    city: "Madar",
    zipcode: "56513",
  },
  {
    district: "Siraha",
    city: "Mirchaiya",
    zipcode: "56515",
  },
  {
    district: "Siraha",
    city: "Bandipur",
    zipcode: "56516",
  },
  {
    district: "Siraha",
    city: "Kalyanpur",
    zipcode: "56517",
  },
  {
    district: "Solukhumbu",
    city: "Solukhumbu",
    zipcode: "56000",
  },
  {
    district: "Solukhumbu",
    city: "Namche Bazar",
    zipcode: "56002",
  },
  {
    district: "Solukhumbu",
    city: "Sotang",
    zipcode: "56004",
  },
  {
    district: "Solukhumbu",
    city: "Jubu",
    zipcode: "56005",
  },
  {
    district: "Solukhumbu",
    city: "Nele",
    zipcode: "56006",
  },
  {
    district: "Solukhumbu",
    city: "Necha",
    zipcode: "56007",
  },
  {
    district: "Solukhumbu",
    city: "Shishakhola",
    zipcode: "56008",
  },
  {
    district: "Solukhumbu",
    city: "Himaganga",
    zipcode: "56009",
  },
  {
    district: "Solukhumbu",
    city: "Lukla",
    zipcode: "56010",
  },
  {
    district: "Sunsari",
    city: "Sunsari",
    zipcode: "56700",
  },
  {
    district: "Sunsari",
    city: "Mangalbare",
    zipcode: "56702",
  },
  {
    district: "Sunsari",
    city: "Chatara",
    zipcode: "56703",
  },
  {
    district: "Sunsari",
    city: "Bakalauri",
    zipcode: "56704",
  },
  {
    district: "Sunsari",
    city: "Itahari",
    zipcode: "56705",
  },
  {
    district: "Sunsari",
    city: "Simariya",
    zipcode: "56706",
  },
  {
    district: "Sunsari",
    city: "Duhabi",
    zipcode: "56707",
  },
  {
    district: "Sunsari",
    city: "Chimadi",
    zipcode: "56708",
  },
  {
    district: "Sunsari",
    city: "Jhumka",
    zipcode: "56709",
  },
  {
    district: "Sunsari",
    city: "Inarauwa",
    zipcode: "56710",
  },
  {
    district: "Sunsari",
    city: "Aurabari",
    zipcode: "56711",
  },
  {
    district: "Sunsari",
    city: "Dewangunj",
    zipcode: "56712",
  },
  {
    district: "Sunsari",
    city: "Madhuvan",
    zipcode: "56713",
  },
  {
    district: "Sunsari",
    city: "Laukahee",
    zipcode: "56714",
  },
  {
    district: "Sunsari",
    city: "Bhutaha",
    zipcode: "56715",
  },
  {
    district: "Sunsari",
    city: "Mahendra Nagar",
    zipcode: "56716",
  },
  {
    district: "Sunsari",
    city: "Chhitaha",
    zipcode: "56717",
  },
  {
    district: "Surkhet",
    city: "Surkhet",
    zipcode: "21700",
  },
  {
    district: "Surkhet",
    city: "Chhinchu",
    zipcode: "21701",
  },
  {
    district: "Surkhet",
    city: "Ramghat",
    zipcode: "21702",
  },
  {
    district: "Surkhet",
    city: "Sahare",
    zipcode: "21703",
  },
  {
    district: "Surkhet",
    city: "Gumi",
    zipcode: "21704",
  },
  {
    district: "Surkhet",
    city: "Bheriganga",
    zipcode: "21705",
  },
  {
    district: "Surkhet",
    city: "Matela",
    zipcode: "21706",
  },
  {
    district: "Surkhet",
    city: "Garpan",
    zipcode: "21707",
  },
  {
    district: "Surkhet",
    city: "Kunathari",
    zipcode: "21709",
  },
  {
    district: "Surkhet",
    city: "Babiyachaur",
    zipcode: "21710",
  },
  {
    district: "Surkhet",
    city: "Gutu",
    zipcode: "21711",
  },
  {
    district: "Syangja",
    city: "Syangja",
    zipcode: "33800",
  },
  {
    district: "Syangja",
    city: "Kolma",
    zipcode: "33802",
  },
  {
    district: "Syangja",
    city: "Kichnas",
    zipcode: "33803",
  },
  {
    district: "Syangja",
    city: "Jharkham",
    zipcode: "33804",
  },
  {
    district: "Syangja",
    city: "Arjunchaupari",
    zipcode: "33805",
  },
  {
    district: "Syangja",
    city: "Panchamul",
    zipcode: "33806",
  },
  {
    district: "Syangja",
    city: "Rangethanti",
    zipcode: "33807",
  },
  {
    district: "Syangja",
    city: "Fedikhola",
    zipcode: "33808",
  },
  {
    district: "Syangja",
    city: "Bhumare",
    zipcode: "33811",
  },
  {
    district: "Syangja",
    city: "Kyakmi",
    zipcode: "33812",
  },
  {
    district: "Syangja",
    city: "Waidha Bhanjhyang",
    zipcode: "33813",
  },
  {
    district: "Syangja",
    city: "Chapakot",
    zipcode: "33814",
  },
  {
    district: "Syangja",
    city: "Galyang",
    zipcode: "33815",
  },
  {
    district: "Tanahun",
    city: "Tanahun",
    zipcode: "33900",
  },
  {
    district: "Tanahun",
    city: "Tuhure Pasal",
    zipcode: "33902",
  },
  {
    district: "Tanahun",
    city: "Manechauka",
    zipcode: "33903",
  },
  {
    district: "Tanahun",
    city: "Bandipur",
    zipcode: "33904",
  },
  {
    district: "Tanahun",
    city: "Aanbu Khaireni",
    zipcode: "33905",
  },
  {
    district: "Tanahun",
    city: "Baidi",
    zipcode: "33906",
  },
  {
    district: "Tanahun",
    city: "Kahunshivapur",
    zipcode: "33907",
  },
  {
    district: "Tanahun",
    city: "Rising Ranipokhari",
    zipcode: "33908",
  },
  {
    district: "Tanahun",
    city: "Ghiring Sundhara",
    zipcode: "33909",
  },
  {
    district: "Tanahun",
    city: "Bhimad",
    zipcode: "33910",
  },
  {
    district: "Tanahun",
    city: "Lamagaun",
    zipcode: "33911",
  },
  {
    district: "Tanahun",
    city: "Khairenitar",
    zipcode: "33912",
  },
  {
    district: "Tanahun",
    city: "Shisha Ghat",
    zipcode: "33913",
  },
  {
    district: "Tanahun",
    city: "Dumre",
    zipcode: "33914",
  },
  {
    district: "Tanahun",
    city: "Devaghat",
    zipcode: "33915",
  },
  {
    district: "Taplejung",
    city: "Khewang",
    zipcode: "57501",
  },
  {
    district: "Taplejung",
    city: "Sadeba",
    zipcode: "57502",
  },
  {
    district: "Taplejung",
    city: "Thokimba",
    zipcode: "57509",
  },
  {
    district: "Taplejung",
    city: "Dobhan",
    zipcode: "57510",
  },
  {
    district: "Taplejung",
    city: "Taplejung",
    zipcode: "57500",
  },
  {
    district: "Taplejung",
    city: "Sinam",
    zipcode: "57503",
  },
  {
    district: "Taplejung",
    city: "Pedang",
    zipcode: "57504",
  },
  {
    district: "Taplejung",
    city: "Thechambu",
    zipcode: "57505",
  },
  {
    district: "Taplejung",
    city: "Siwang",
    zipcode: "57506",
  },
  {
    district: "Taplejung",
    city: "Khokling",
    zipcode: "57507",
  },
  {
    district: "Taplejung",
    city: "Olangchunggola",
    zipcode: "57508",
  },
  {
    district: "Taplejung",
    city: "Change",
    zipcode: "57511",
  },
  {
    district: "Taplejung",
    city: "Hangpang",
    zipcode: "57512",
  },
  {
    district: "Terhathum",
    city: "Terhathum",
    zipcode: "57100",
  },
  {
    district: "Terhathum",
    city: "Jirikhimti",
    zipcode: "57102",
  },
  {
    district: "Terhathum",
    city: "Tinjure",
    zipcode: "57103",
  },
  {
    district: "Terhathum",
    city: "Basantapur",
    zipcode: "57104",
  },
  {
    district: "Terhathum",
    city: "Sudap",
    zipcode: "57105",
  },
  {
    district: "Terhathum",
    city: "Hamarjung",
    zipcode: "57106",
  },
  {
    district: "Terhathum",
    city: "Morahang",
    zipcode: "57107",
  },
  {
    district: "Terhathum",
    city: "Pokalawang",
    zipcode: "57108",
  },
  {
    district: "Terhathum",
    city: "Mulpani",
    zipcode: "57110",
  },
  {
    district: "Terhathum",
    city: "Iwa",
    zipcode: "57111",
  },
  {
    district: "Udayapur",
    city: "Udayapur",
    zipcode: "56300",
  },
  {
    district: "Udayapur",
    city: "Ratapani (Thoksila)",
    zipcode: "56301",
  },
  {
    district: "Udayapur",
    city: "Beltar",
    zipcode: "56302",
  },
  {
    district: "Udayapur",
    city: "Hadiya",
    zipcode: "56303",
  },
  {
    district: "Udayapur",
    city: "Pokhari",
    zipcode: "56305",
  },
  {
    district: "Udayapur",
    city: "Baraha",
    zipcode: "56306",
  },
  {
    district: "Udayapur",
    city: "Bhutar",
    zipcode: "56307",
  },
  {
    district: "Udayapur",
    city: "Rampur Jhilke",
    zipcode: "56308",
  },
  {
    district: "Udayapur",
    city: "Udayapur Gadhi",
    zipcode: "56309",
  },
  {
    district: "Udayapur",
    city: "Katari",
    zipcode: "56310",
  },
  {
    district: "Udayapur",
    city: "Sorung Chhabise",
    zipcode: "56311",
  },
  {
    district: "Udayapur",
    city: "Rauta Murkuchi",
    zipcode: "56312",
  },
];

// export default function Context() {

//     const [isLogedIn, setIsLogedIn] = useState(false)

//     return (
//        <AuthContext.Provider value={isLogedIn}>
//        </AuthContext.Provider>
//     )
// }
