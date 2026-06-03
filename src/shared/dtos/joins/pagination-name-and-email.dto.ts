import { IntersectionType } from '@nestjs/swagger';
import { EmailDto } from '../query-patterns/email.dto';
import { NameDto } from '../query-patterns/name.dto';
import { PaginationDto } from '../query-patterns/pagination.dto';

export class PaginationNameAndEmailDto extends IntersectionType(PaginationDto, NameDto, EmailDto) {}
