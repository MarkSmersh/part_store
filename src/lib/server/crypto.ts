import bcrypt from 'bcrypt';

export async function passwordHash(password: string) {
	return bcrypt.hashSync(password, 10);
}

export async function passwordCompare(plainPassword: string, hashedPassword: string) {
	return bcrypt.compareSync(plainPassword, hashedPassword);
}
