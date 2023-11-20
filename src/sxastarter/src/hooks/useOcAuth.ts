import { OcAuthState } from '../redux/ocAuth';
import { useOcSelector } from '../redux/ocStore';

const useOcAuth = (): OcAuthState => useOcSelector((s) => s.ocAuth);

export default useOcAuth;
