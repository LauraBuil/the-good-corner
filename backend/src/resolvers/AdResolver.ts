import Ad from "../entities/Ad";
import {Arg, Query, Resolver, Mutation, Field, InputType, ID} from "type-graphql";
import { FindManyOptions } from "typeorm";
import Category from "../entities/Category";
import Tag from "../entities/Tag";

@InputType()
class AdInput {
    @Field()
    title!: string; //TODO make it required with '!' ?

    @Field()
    description!: string;

    @Field()
    author!: string;

    @Field()
    price!: number;

    @Field()
    pictureUrl!: string;

    @Field()
    city!: string;

    @Field(() => ID)
    category!: Category;

    @Field(() => [ID])
    tags!: Tag[];
}

@Resolver(Ad)
export default class AdResolver {
    @Query(() => [Ad])
    async getAllAds() {
        let findOptions: FindManyOptions<Ad> = {
            relations: { category: true, tags: true },
        };
        await Ad.find(findOptions);
    }

    @Mutation(() => Ad)
    async createAd(@Arg("data") data: AdInput) {
        const ad = new Ad();
        ad.title = data.title;
        ad.description = data.description;
        ad.author = data.author;
        ad.price = data.price;
        ad.pictureUrl = data.pictureUrl;
        ad.city = data.city;
        ad.category = data.category;
        ad.tags = data.tags.map((tag) => tag);
        try {
            await ad.save();
            return ad;
        } catch (err) {
            console.warn(err);
        }
    }
}