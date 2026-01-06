export interface ServiceDetail {
  id: number;
  image: string;
  imageAlt: string;
}

// All service content (title, descriptions, features, benefits, process) comes from translation files
// This file only contains the service structure: id, image paths, and imageAlt
export const servicesData: ServiceDetail[] = [
  {
    id: 1,
    image: "/images/typing.jpg",
    imageAlt: "Typing Master training",
  },
  {
    id: 2,
    image: "/images/telly.jpg",
    imageAlt: "Tally GST training",
  },
  {
    id: 3,
    image: "/images/graphicDesign.jpg",
    imageAlt: "Graphic Designing Training",
  },
  {
    id: 4,
    image: "/images/excel.jpg",
    imageAlt: "Excel Training",
  },
  {
    id: 5,
    image: "/images/AUTOCAD.jpeg",
    imageAlt: "AutoCAD Training",
  },
  {
    id: 6,
    image: "/images/ADCA.jpeg",
    imageAlt: "ADCA Training",
  },
  {
    id: 7,
    image: "/images/cscCenter.jpg",
    imageAlt: "CSC Center services",
  },
  {
    id: 8,
    image: "/images/coaching.jpg",
    imageAlt: "Computer Coaching Center",
  },
  {
    id: 9,
    image: "/images/hardware.jpg",
    imageAlt: "Computer Hardware Repair",
  },
  {
    id: 10,
    image: "/images/dataEntry.jpg",
    imageAlt: "Data Entry training",
  },
];

export function getServiceById(id: number): ServiceDetail | undefined {
  return servicesData.find((service) => service.id === id);
}

export function getAllServices(): ServiceDetail[] {
  return servicesData;
}
