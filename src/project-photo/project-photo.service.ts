import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectPhoto } from './entities/project-photo.entity';
import { CreateProjectPhotoDto } from './dto/create-project-photo.dto';
import { UpdateProjectPhotoDto } from './dto/update-project-photo.dto';

@Injectable()
export class ProjectPhotoService {
  constructor(
    @InjectRepository(ProjectPhoto)
    private readonly projectPhotoRepository: Repository<ProjectPhoto>,
  ) {}

  async create(createProjectPhotoDto: CreateProjectPhotoDto): Promise<ProjectPhoto> {
    const projectPhoto = this.projectPhotoRepository.create(createProjectPhotoDto);
    return this.projectPhotoRepository.save(projectPhoto);
  }

  async findAll(): Promise<ProjectPhoto[]> {
    return this.projectPhotoRepository.find();
  }

  async findOne(id: number): Promise<ProjectPhoto> {
    const projectPhoto = await this.projectPhotoRepository.findOneBy({ id });
    if (!projectPhoto) {
      throw new NotFoundException(`ProjectPhoto with ID ${id} not found`);
    }
    return projectPhoto;
  }

  async update(id: number, updateProjectPhotoDto: UpdateProjectPhotoDto): Promise<ProjectPhoto> {
    const projectPhoto = await this.findOne(id);
    Object.assign(projectPhoto, updateProjectPhotoDto);
    return this.projectPhotoRepository.save(projectPhoto);
  }

  async remove(id: number): Promise<void> {
    const result = await this.projectPhotoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ProjectPhoto with ID ${id} not found`);
    }
  }

}