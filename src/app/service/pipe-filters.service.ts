import { Pipe, PipeTransform } from '@angular/core';
// In this service we will implement all required pipe services
@Pipe({
  name: 'cityFilter',
  pure: true,
})
export class CityFilterPipe implements PipeTransform {
  transform(items: any[], filter: Record<string, any>): any {
    if (!items || items.length == 0 || !filter.city) {
      return items;
    }
    const key = Object.keys(filter)[0];
    const value = filter[key].toLowerCase();
    return items.filter((e) => e[key].toLowerCase().indexOf(value) !== -1);
  }
}

@Pipe({
  name: 'stateFilter',
  pure: true,
})
export class StateFilterPipe implements PipeTransform {
  transform(items: any[], filter: Record<string, any>): any {
    if (!items || items.length == 0 || !filter.state) {
      return items;
    }
    const key = Object.keys(filter)[0];
    const value = filter[key].toLowerCase();
    return items.filter((e) => e[key].toLowerCase().indexOf(value) !== -1);
  }
}

@Pipe({
  name: 'buildingFilter',
  pure: true,
})
export class BuildingFilterPipe implements PipeTransform {
  transform(items: any[], filter: Record<string, any>): any {
    if (!items || items.length == 0 || !filter.product) {
      return items;
    }
    const key = Object.keys(filter)[0];
    const value = filter[key].toLowerCase();
    return items.filter((e) => e[key].toLowerCase().indexOf(value) !== -1);
  }
}

@Pipe({
  name: 'rateFilter',
  pure: true,
})
export class RateFilterPipe implements PipeTransform {
  transform(items: any[], filter: Record<string, any>): any {
    if (!items || items.length == 0 || !filter.rating) {
      return items;
    }
    const key = Object.keys(filter)[0];
    const value = filter[key].toLowerCase();
    return items.filter((e) => parseInt(e[key]) === parseInt(value));
  }
}
