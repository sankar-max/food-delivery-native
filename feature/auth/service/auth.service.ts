import { account } from "@/lib/appwrite/account";
import { signInSchemaType } from "../schemas/auth.schema";

export async function deleteCurrentSession() {
	try {
		await account.deleteSession({ sessionId: "current" });
	} catch {}
}

export async function signIn(input: signInSchemaType) {
	try {
		await deleteCurrentSession();

		const session = await account.createEmailPasswordSession({
			email: input.email,
			password: input.password,
		});

		return session;
	} catch (error: any) {
		console.error("Error signing in:", error);
		throw new Error(error.message || "Failed to sign in");
	}
}

export async function signOut() {
	try {
		return await account.deleteSession({ sessionId: "current" });
	} catch (error: any) {
		console.error("Error signing out:", error);
		throw new Error(error.message || "Failed to sign out");
	}
}

export async function getCurrentAccount() {
	try {
		return await account.get();
	} catch {
		return null;
	}
}
