import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
  })
  export class FilterPipe implements PipeTransform {
    
    
    transform(items: any[], searchText: string): any[] {
      if (!items) return [];
      if (!searchText) return items;
    
      searchText = searchText.toLowerCase();
    
      return items.filter(item => {
        // Aplica la lógica de filtrado en campos relevantes
        const matchFound = (
          // item.HORA.toLowerCase().includes(searchText) ||
          // item.SECTOR.toLowerCase().includes(searchText) ||
          item.UNIDAD_NUM.toLowerCase().includes(searchText)
          // Agrega más campos según sea necesario
        );
    
        return matchFound;
      });
    }
  }
  
  
