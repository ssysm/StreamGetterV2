import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ffmpegCommand'
})
export class FfmpegCommandPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return `ffplay -i "${value}" -vcodec copy -acodec copy ${value}.ts `;
  }

}
