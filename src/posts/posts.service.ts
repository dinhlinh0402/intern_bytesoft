import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post)
  private postRepository: Repository<Post>,
    private userService: UserService
  ) { }

  async create(createPostInput: CreatePostInput, dataUser: any) {
    // console.log(dataUser);
    const { id } = dataUser;
    const { userId } = createPostInput
    if (id !== userId) {
      throw new UnauthorizedException()
    }

    const post = {
      ...createPostInput,
      created_at: new Date(),
      updated_at: new Date(),
    }

    const createPost = this.postRepository.create(post)

    return this.postRepository.save(createPost)

  }

  findAll() {
    return this.postRepository.find()
  }

  findOne(id: string) {
    return this.postRepository.findOne(id)
  }

  getUser(userId: string) {
    return this.userService.findById(userId)
  }

  async update(updatePostInput: UpdatePostInput, userData: any) {
    const { id: userId } = userData;
    const { id, ...dataUpdate } = updatePostInput;

    const post = await this.postRepository.findOne(
      {
        where: { id, userId }
      }
    )

    if (!post) {
      throw new BadRequestException('Post does not exist')
    }

    return this.postRepository.save({
      ...post,
      updated_at: new Date(),
      ...dataUpdate
    })

  }

  async remove(id: string, userId: string) {

    const post = await this.postRepository.findOne({
      where: { id, userId },
    })
    if (!post) {
      throw new BadRequestException('Post does not exist')
    }
    await this.postRepository.delete(post)
    return post;
  }
}
