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
			console.log('📥 Fetching user profile for:', userId);
			const { data, error } = await supabase
				.from('users')
				.select('*')
				.eq('id', userId)
				.single();

			if (error) {
				console.error('Error fetching user profile:', error);
				return;
			}

			if (data) {
				console.log('✅ Profile data received:', data);
				setUserProfile(data);
			} else {
				console.log('⚠️ No profile data found');
				setUserProfile(null);
			}
		} catch (error) {
			console.error('Error in fetchUserProfile:', error);
			setUserProfile(null);
		}
	};

	const refreshProfile = async () => {
		if (session?.user.id) {
			console.log('🔄 Refreshing user profile...');
			await fetchUserProfile(session.user.id);
		} else {
			console.log('⚠️ Cannot refresh profile - no session');
		}
	};

	useEffect(() => {
		// Initialize: check for existing session
		supabase.auth.getSession().then(({ data: { session } }) => {
			console.log('🔐 Initial session check:', {
				hasSession: !!session,
				userId: session?.user?.id
			});
			setSession(session);
			setUser(session ? true : false);
			if (session?.user.id) {
				fetchUserProfile(session.user.id);
			}
		});

		// Listen for auth changes
		const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
			console.log('🔄 Auth state change:', {
				event,
				hasSession: !!session,
				userId: session?.user?.id
			});
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

	console.log('🏃 Auth Provider State:', {
		user,
		hasSession: !!session,
		hasProfile: !!userProfile
	});

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
