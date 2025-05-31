import { SelectedMajor } from '@/store/universityStore';

export interface Preset {
  id: string;
  name: string;
  majors: SelectedMajor[];
}

export const presets: Preset[] = [
  {
    id: 'computer-science',
    name: 'مهندسی کامپیوتر',
    majors: [
      {
        id: 'cs-1',
        name: 'رایانش امن',
        universityId: 'sharif',
        universityName: 'دانشگاه صنعتی شریف',
        rank: 1
      },
      {
        id: 'cs-2',
        name: 'بیوانفورماتیک',
        universityId: 'sharif',
        universityName: 'دانشگاه صنعتی شریف',
        rank: 2
      },
      {
        id: 'cs-3',
        name: 'نرم افزار',
        universityId: 'sharif',
        universityName: 'دانشگاه صنعتی شریف',
        rank: 3
      },
      {
        id: 'cs-4',
        name: 'شبکه های کامپیوتری',
        universityId: 'sharif',
        universityName: 'دانشگاه صنعتی شریف',
        rank: 4
      },
      {
        id: 'cs-5',
        name: 'معماری سیستم‌های کامپیوتری',
        universityId: 'sharif',
        universityName: 'دانشگاه صنعتی شریف',
        rank: 5
      },
      {
        id: 'cs-6',
        name: 'هوش مصنوعی',
        universityId: 'sharif',
        universityName: 'دانشگاه صنعتی شریف',
        rank: 6
      },
      {
        id: 'cs-7',
        name: 'الگوریتم و محاسبات',
        universityId: 'sharif',
        universityName: 'دانشگاه صنعتی شریف',
        rank: 7
      },
      {
        id: 'cs-8',
        name: 'علوم و فناوری شبکه',
        universityId: 'tehran',
        universityName: 'دانشگاه تهران روزانه',
        rank: 8
      },
      {
        id: 'cs-9',
        name: 'معماری سیستم‌های کامپیوتری',
        universityId: 'tehran',
        universityName: 'دانشگاه تهران روزانه',
        rank: 9
      },
      {
        id: 'cs-10',
        name: 'هوش مصنوعی',
        universityId: 'tehran',
        universityName: 'دانشگاه تهران روزانه',
        rank: 10
      },
      {
        id: 'cs-11',
        name: 'علوم و فناوری شبکه',
        universityId: 'tehran-night',
        universityName: 'دانشگاه تهران شبانه',
        rank: 11
      },
      {
        id: 'cs-12',
        name: 'معماری سیستم‌های کامپیوتری',
        universityId: 'tehran-night',
        universityName: 'دانشگاه تهران شبانه',
        rank: 12
      },
      {
        id: 'cs-13',
        name: 'بازی‌های رایانه‌ای',
        universityId: 'iust',
        universityName: 'دانشگاه علم و صنعت',
        rank: 13
      },
      {
        id: 'cs-14',
        name: 'شبکه های کامپیوتری',
        universityId: 'iust',
        universityName: 'دانشگاه علم و صنعت',
        rank: 14
      },
      {
        id: 'cs-15',
        name: 'نرم افزار',
        universityId: 'iust',
        universityName: 'دانشگاه علم و صنعت',
        rank: 15
      },
      {
        id: 'cs-16',
        name: 'شبکه های کامپیوتری',
        universityId: 'amirkabir',
        universityName: 'دانشگاه صنعتی امیرکبیر',
        rank: 16
      },
      {
        id: 'cs-17',
        name: 'نرم افزار',
        universityId: 'amirkabir',
        universityName: 'دانشگاه صنعتی امیرکبیر',
        rank: 17
      },
      {
        id: 'cs-18',
        name: 'رایانش امن',
        universityId: 'amirkabir',
        universityName: 'دانشگاه صنعتی امیرکبیر',
        rank: 18
      },
      {
        id: 'cs-19',
        name: 'هوش مصنوعی',
        universityId: 'beheshti',
        universityName: 'دانشگاه شهید بهشتی',
        rank: 19
      },
      {
        id: 'cs-20',
        name: 'معماری سیستم‌های کامپیوتری',
        universityId: 'beheshti',
        universityName: 'دانشگاه شهید بهشتی',
        rank: 20
      },
      {
        id: 'cs-21',
        name: 'نرم افزار',
        universityId: 'beheshti',
        universityName: 'دانشگاه شهید بهشتی',
        rank: 21
      },
      {
        id: 'cs-22',
        name: 'قرآن‌کاوی رایانشی',
        universityId: 'beheshti',
        universityName: 'دانشگاه شهید بهشتی',
        rank: 22
      },
      {
        id: 'cs-23',
        name: 'شبکه های کامپیوتری',
        universityId: 'khajenasir',
        universityName: 'دانشگاه خواجه نصیر روزانه',
        rank: 23
      },
      {
        id: 'cs-24',
        name: 'معماری سیستم‌های کامپیوتری',
        universityId: 'khajenasir',
        universityName: 'دانشگاه خواجه نصیر شبانه',
        rank: 24
      },
      {
        id: 'cs-25',
        name: 'نرم افزار',
        universityId: 'khajenasir',
        universityName: 'دانشگاه خواجه نصیر شبانه',
        rank: 25
      },
      {
        id: 'cs-26',
        name: 'هوش مصنوعی',
        universityId: 'khajenasir',
        universityName: 'دانشگاه خواجه نصیر شبانه',
        rank: 26
      },
      {
        id: 'cs-27',
        name: 'رایانش امن',
        universityId: 'modares',
        universityName: 'دانشگاه تربیت مدرس',
        rank: 27
      },
      {
        id: 'cs-28',
        name: 'نرم افزار',
        universityId: 'modares',
        universityName: 'دانشگاه تربیت مدرس',
        rank: 28
      },
      {
        id: 'cs-29',
        name: 'جرم‌یابی دیجیتال',
        universityId: 'modares',
        universityName: 'دانشگاه تربیت مدرس',
        rank: 29
      }
    ]
  }
];
