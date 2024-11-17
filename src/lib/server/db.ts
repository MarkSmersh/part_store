import { MikroORM } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { User, Cart, Product, ItemCart, Address, Order, OrderItem} from './models';
import { DB_STRING } from '$env/static/private';

export const orm = await MikroORM.init({
	entities: [User, Cart, Product, ItemCart, Address, Order, OrderItem],
  	metadataProvider: TsMorphMetadataProvider,
	clientUrl: DB_STRING,
	allowGlobalContext: true,
	forceEntityConstructor: true,
});

export const em = orm.em;