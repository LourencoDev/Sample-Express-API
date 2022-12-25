import { Request, Response } from 'express';
import Post from '../entities/post';
import postService from '../services/postService';
import postRepository from '../repositories/postRepository';

const postController = {
    getPosts: (req: Request, res: Response) => {
        postService
            .getPosts()
            .then((posts) => res.status(200).send({ posts }))
            .catch((error) => res.status(500).send({ error }));
    },

    getPost: (req: Request, res: Response) => {
        const id = Number(req.params.id);

        postService
            .getPost(id)
            .then((post) => res.status(200).send({ post }))
            .catch((error) => res.status(500).send({ error }));
    },

    addPost: (req: Request, res: Response) => {
        const { title, content } = req.body;

        if (!title || !content) {
            res.status(400).send({ error: 'Invalid body' });
            return;
        }

        const post = postRepository.create(req.body as Post);

        postService
            .addPost(post)
            .then(() => res.status(201).send())
            .catch((error) => res.status(500).send({ error }));
    },

    updatePost: (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const { title, content } = req.body;

        if (!title || !content) {
            res.status(400).send({ error: 'Invalid body' });
            return;
        }

        const post = postRepository.create({ ...req.body, id } as Post);

        postService
            .updatePost(post)
            .then(() => res.status(200).send())
            .catch((error) => res.status(500).send({ error }));
    },

    deletePost: (req: Request, res: Response) => {
        const id = Number(req.params.id);

        postService
            .deletePost(id)
            .then(() => res.status(200).send())
            .catch((error) => res.status(500).send({ error }));
    }
};

export default postController;
