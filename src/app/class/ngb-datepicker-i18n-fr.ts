import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslationWidth } from '@angular/common';

const I18N_VALUES = {
  'fr': {
    weekdays: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  }
};

@Injectable()
export class NgbDatepickerI18nFr extends NgbDatepickerI18n {

  getWeekdayLabel(weekday: number, width: TranslationWidth = TranslationWidth.Short): string {
    switch (width) {
      case TranslationWidth.Short:
        return I18N_VALUES['fr'].weekdays[weekday - 1].substr(0, 3);
      // case TranslationWidth.Long:
      //   return I18N_VALUES['fr'].weekdays[weekday - 1];
      case TranslationWidth.Narrow:
        return I18N_VALUES['fr'].weekdays[weekday - 1].charAt(0);
      default:
        return I18N_VALUES['fr'].weekdays[weekday - 1];
    }
  }

  getMonthShortName(month: number): string {
    return I18N_VALUES['fr'].months[month - 1].substr(0, 3);
  }

  getMonthFullName(month: number): string {
    return I18N_VALUES['fr'].months[month - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    console.log("hello world")
    console.log(date)
    return `${date.day}-${date.month}-${date.year - 1}`;
  }
}
