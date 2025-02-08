import React, { createContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';

type UserProfile = {
	id: string;
	email: string;
	name: string;
	birthday: string;
	gender: string;
	currency: string;
	created_at: string;
	updated_at: string;
};

type ContextProps = {
	user: null | boolean;
	session: Session | null;
	userProfile: UserProfile | null;
	refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props {
	children: React.ReactNode;
}

const AuthProvider = (props: Props) => {
	// user null = loading
	const [user, setUser] = useState<null | boolean>(null);
	const [session, setSession] = useState<Session | null>(null);
	const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

	const fetchUserProfile = async (userId: string) => {
		try {
			const { data, error } = await supabase
				.from('users')
				.select('*')
				.eq('id', userId)
				.single();

			if (error) {
				return;
			}

			if (data) {
				setUserProfile(data);
			} else {
				setUserProfile(null);
			}
		} catch (error) {
			setUserProfile(null);
		}
	};

	const refreshProfile = async () => {
		if (session?.user.id) {
			await fetchUserProfile(session.user.id);
		}
	};

	useEffect(() => {
		// Initialize: check for existing session
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setUser(session ? true : false);
			if (session?.user.id) {
				fetchUserProfile(session.user.id);
			}
		});

		// Listen for auth changes
		const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
			setSession(session);
			setUser(session ? true : false);
			
			if (session?.user.id) {
				await fetchUserProfile(session.user.id);
			} else {
				setUserProfile(null);
			}
		});

		return () => subscription.unsubscribe();
	}, []);

	return (
		<AuthContext.Provider
			value={{
				user,
				session,
				userProfile,
				refreshProfile,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
