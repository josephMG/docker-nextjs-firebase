import { v4 as uuidv4 } from "uuid";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { TokenInfoProps } from "@/types/TokenProps";
import setDocWithTimeoutError from "@/libs/setDocWithTimeoutError";
import { db } from "@/configs/firebase";

export const setToken = async (
  tokenInfo: TokenInfoProps
): Promise<TokenInfoProps> => {
  if (!tokenInfo.id) {
    tokenInfo.id = uuidv4();
  }

  // await setDoc(doc(db, "tokens", tokenInfo.id), tokenInfo, { merge: true });
  // await setDocWithTimeoutError(`tokens/${tokenInfo.id}`, tokenInfo)
  try {
    await setDocWithTimeoutError(`tokens/${tokenInfo.id}`, tokenInfo);
  } catch (e) {}
  return tokenInfo;
};

// export const getProfile = async (id: string, snapshot: () => void): Promise<TokenInfoProps | null> => {
// onSnapshot(doc(db, 'tokens', id), { includeMetadataChanges: true }, snapshot);
export const getToken = async (id: string): Promise<TokenInfoProps | null> => {
  const docRef = doc(db, "tokens", id);
  const tokenSnapshot = await getDoc(docRef);
  /*
  const { hasPendingWrites, __snapshot, ...tokenSnapshot } = await getDoc(
    `tokens/${id}`
  );
 */
  if (tokenSnapshot.exists()) {
    return tokenSnapshot.data() as TokenInfoProps;
  } else {
    return null;
  }
};
export const getTokens = async (): Promise<TokenInfoProps[] | []> => {
  const tokensSnapshot = await getDocs(collection(db, "tokens"));
  /*
  const { hasPendingWrites, __snapshot, ...tokenSnapshot } = await getDoc(
    `tokens/${id}`
  );
 */
  return tokensSnapshot.docs.map((snap) => snap.data() as TokenInfoProps);
};
