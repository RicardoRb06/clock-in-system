import { beforeEach, describe, expect, it } from "vitest";
import { mock, type MockProxy } from 'vitest-mock-extended';
import { UserRepository } from "../../../src/repository/user.repository.js";
import { AuthService } from "../../../src/service/auth.service.js";
import { err, ok } from "../../../src/utils/result.js";

describe('AuthService', () => {
    let userRepository: MockProxy<UserRepository>;
    let service: AuthService;

    beforeEach(() => {
        userRepository = mock<UserRepository>();
        service = new AuthService(userRepository);
    });

    describe('register', () => {
        it('deve retornar token quando sucesso', async () => {
            const name = 'Ricardo';
            const password = '123';
            userRepository.save.mockResolvedValue(ok());

            const result = await service.register(name, password);

            expect(result.success).toBe(true);
            if (result.success) {
                expect(typeof result.data).toBe('string');
                expect(result.data!.length).toBeGreaterThan(0);
            }
        });

        it('deve salvar o usuário com a senha hasheada, não em texto puro', async () => {
            const name = 'Ricardo';
            const password = '123';
            userRepository.save.mockResolvedValue(ok());

            await service.register(name, password);

            expect(userRepository.save).toHaveBeenCalledTimes(1);
            const savedUser = userRepository.save.mock.calls[0]![0];
            expect(savedUser.name).toBe(name);
            expect(savedUser.passwordHash).not.toBe(password);
        });

        it('deve repassar a categoria informada para o usuário salvo', async () => {
            const name = 'Ricardo';
            const password = '123';
            const category = 'sumo';
            userRepository.save.mockResolvedValue(ok());

            await service.register(name, password, category);

            const savedUser = userRepository.save.mock.calls[0]![0];
            expect(savedUser.category).toBe(category);
        });

        it('deve retornar erro e não gerar token quando o repositório falhar ao salvar', async () => {
            const name = 'Ricardo';
            const password = '123';
            const error = new Error('Usuário já existe');
            userRepository.save.mockResolvedValue(err(error));

            const result = await service.register(name, password);

            expect(result.success).toBe(false);
            if (!result.success) {
                expect(result.error).toBe(error);
            }
        });
    });

    describe('login', () => {
        it('deve retornar token quando sucesso', async () => {
            
        })
    });
})