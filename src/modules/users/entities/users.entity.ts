export class Users {
  id: string;
  name: string;
  email: string;
  lastAccess: string;
  isPaying: boolean;
  isActive: boolean;

  constructor(
    id: string,
    name: string,
    email: string,
    lastAccess: number, // Agora é um número
    isPaying: boolean,
    isActive: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.email = this.obfuscateEmail(email);
    this.lastAccess = this.convertDate(lastAccess);
    this.isPaying = isPaying;
    this.isActive = isActive;
  }

  private obfuscateEmail(email: string): string {
    const domainRegex = /@niuco\.com\.br$/;
    if (domainRegex.test(email)) {
      return email;
    } else {
      // Ofusca o email, mostrando apenas os 3 primeiros caracteres do local part
      return email.replace(/^(.{3}).*(@.*)$/, '$1***$2');
    }
  }

  // Convert date to padrão ISO-8601
  private convertDate(date: number): string {
    return new Date(date * 1000).toISOString(); // Multiplica por 1000 para converter segundos para milissegundos
  }
}
