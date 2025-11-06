import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  updateDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date | { toDate: () => Date };
  updatedAt: Date | { toDate: () => Date };
}

// Add new contact submission
export const addContactSubmission = async (contactData: Omit<ContactSubmission, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...contactData,
      status: 'new',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    return {
      id: docRef.id,
      ...contactData,
      status: 'new',
      createdAt: new Date(),
      updatedAt: new Date()
    };
  } catch (error) {
    console.error('Error adding contact submission:', error);
    throw error;
  }
};

// Get all contact submissions
export const getContactSubmissions = async (): Promise<ContactSubmission[]> => {
  try {
    const contactsRef = collection(db, 'contacts');
    const q = query(contactsRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const contacts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as ContactSubmission[];
    
    return contacts;
  } catch (error) {
    console.error('Error getting contact submissions:', error);
    throw error;
  }
};

// Update contact status
export const updateContactStatus = async (id: string, status: ContactSubmission['status']) => {
  try {
    const contactRef = doc(db, 'contacts', id);
    await updateDoc(contactRef, {
      status,
      updatedAt: serverTimestamp()
    });
    
    return { id, status };
  } catch (error) {
    console.error('Error updating contact status:', error);
    throw error;
  }
};

// Get contact submission by ID
export const getContactSubmissionById = async (id: string): Promise<ContactSubmission | null> => {
  try {
    const contactRef = doc(db, 'contacts', id);
    const contactDoc = await getDoc(contactRef);
    
    if (contactDoc.exists()) {
      const data = contactDoc.data();
      return {
        id: contactDoc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as ContactSubmission;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting contact submission by ID:', error);
    throw error;
  }
};
